import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { apiFetch, ApiError, setUnauthorizedHandler, setRefreshHandler } from '../api/client';
import {
  clearToken,
  getToken,
  getRefreshToken,
  getBiometricEnabled,
  markDeviceRegistered,
  saveTokens,
  saveAccessToken,
  saveRefreshToken,
  setBiometricPref,
} from './token-store';
import { authenticateBiometric, isBiometricAvailable } from './biometrics';
import type { LoginResponse, MobileCapabilities, MobileUser, RefreshResponse } from './types';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'locked';

const DEFAULT_CAPABILITIES: MobileCapabilities = {
  canManageWorkOrders: false,
  canDelegateWorkOrders: false,
  canViewAllWorkOrders: true,
};

// Shape consumido pelas telas (Home/Perfil)
export type SessionUser = {
  id: string;
  name: string;
  dept: string;
  unit: string;
  role: string;
  username: string;
  cpf: string | null;
  avatarUrl: string | null;
  capabilities: MobileCapabilities;
  permissions: Record<string, boolean>;
};

function toSessionUser(u: MobileUser): SessionUser {
  return {
    id: u.id,
    name: u.fullName || u.username,
    dept: u.department || u.role,
    unit: '',
    role: u.role,
    username: u.username,
    cpf: u.cpf ?? null,
    avatarUrl: u.avatarUrl ?? null,
    capabilities: u.capabilities ?? DEFAULT_CAPABILITIES,
    permissions: u.permissions ?? {},
  };
}

type AuthContextValue = {
  status: AuthStatus;
  user: SessionUser | null;
  token: string | null;
  biometricEnabled: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  /** Desbloqueia a tela de biometria. Retorna true se autenticou. */
  unlock: () => Promise<boolean>;
  /** Liga/desliga o desbloqueio por biometria (confirma com uma leitura ao ligar). */
  setBiometric: (enabled: boolean) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<SessionUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  // Refresh token corrente (fonte de verdade em memória durante a sessão) e a
  // troca em voo (dedup: várias requests 401 ao mesmo tempo disparam UM refresh).
  const refreshTokenRef = useRef<string | null>(null);
  const inFlightRefresh = useRef<Promise<string | null> | null>(null);

  async function clearSession() {
    refreshTokenRef.current = null;
    await clearToken();
    setToken(null);
    setUser(null);
    setStatus('unauthenticated');
  }

  // Troca silenciosa do access token usando o refresh (rotativo). Deduplicada:
  // chamadas concorrentes esperam a mesma promessa. Em falha, encerra a sessão.
  async function doRefresh(): Promise<string | null> {
    if (inFlightRefresh.current) return inFlightRefresh.current;
    const current = refreshTokenRef.current;
    if (!current) return null;

    inFlightRefresh.current = (async () => {
      try {
        const res = await apiFetch<RefreshResponse>('/api/mobile/auth/refresh', {
          method: 'POST',
          body: { refreshToken: current },
        });
        refreshTokenRef.current = res.refreshToken;
        await saveAccessToken(res.token);
        await saveRefreshToken(res.refreshToken);
        setToken(res.token);
        return res.token;
      } catch {
        await clearSession();
        return null;
      } finally {
        inFlightRefresh.current = null;
      }
    })();
    return inFlightRefresh.current;
  }

  // Registra os handlers do client: refresh silencioso no 401 e, em último caso,
  // encerramento da sessão.
  useEffect(() => {
    setRefreshHandler(() => doRefresh());
    setUnauthorizedHandler(() => {
      void clearSession();
    });
    return () => {
      setRefreshHandler(null);
      setUnauthorizedHandler(null);
    };
  }, []);

  // Bootstrap: reusa os tokens salvos. Se a biometria está ligada, entra travado
  // (LockScreen pede a digital); o refresh acontece no unlock. Senão, valida já.
  useEffect(() => {
    (async () => {
      try {
        const [storedAccess, storedRefresh] = await Promise.all([getToken(), getRefreshToken()]);
        if (!storedRefresh) {
          await clearToken();
          setStatus('unauthenticated');
          return;
        }
        refreshTokenRef.current = storedRefresh;
        setToken(storedAccess);

        const bioOn = await getBiometricEnabled();
        setBiometricEnabled(bioOn);
        if (bioOn && (await isBiometricAvailable())) {
          // Fica travado; a validação/refresh e o /me acontecem em unlock().
          setStatus('locked');
          return;
        }
        // Sem biometria: valida já. Se falhar (rede/auth), cai para a tela de
        // login — os tokens salvos não são apagados numa falha só de rede.
        const ok = await hydrateSession();
        if (!ok) setStatus('unauthenticated');
      } catch {
        await clearToken();
        setStatus('unauthenticated');
      }
    })();
  }, []);

  // Valida a sessão contra o servidor. O /me dispara refresh automático se o
  // access estiver expirado (via handler do client). Sucesso → authenticated.
  // Falha de AUTENTICAÇÃO (401/403) encerra a sessão; falha transitória de rede
  // NÃO desloga — devolve false e mantém o estado atual (o usuário pode repetir).
  async function hydrateSession(): Promise<boolean> {
    try {
      const me = await apiFetch<MobileUser>('/api/mobile/me', { token: await getToken() });
      setUser(toSessionUser(me));
      setStatus('authenticated');
      return true;
    } catch (e) {
      const authFailed = e instanceof ApiError && (e.status === 401 || e.status === 403);
      // Em 401 o refresh handler já pode ter encerrado a sessão; garante o estado.
      if (authFailed && refreshTokenRef.current) await clearSession();
      return false;
    }
  }

  const unlock = async (): Promise<boolean> => {
    const ok = await authenticateBiometric('Desbloquear o Servus');
    if (!ok) return false;
    // Digital ok: restaura a sessão (refresh + /me) sem pedir senha.
    return hydrateSession();
  };

  const setBiometric = async (enabled: boolean): Promise<boolean> => {
    if (enabled) {
      if (!(await isBiometricAvailable())) return false;
      // Confirma com uma leitura antes de ligar (evita ligar sem funcionar).
      if (!(await authenticateBiometric('Confirmar biometria'))) return false;
      await setBiometricPref(true);
      setBiometricEnabled(true);
      return true;
    }
    await setBiometricPref(false);
    setBiometricEnabled(false);
    return true;
  };

  async function signIn(username: string, password: string) {
    const res = await apiFetch<LoginResponse>('/api/mobile/auth/login', {
      method: 'POST',
      body: { username, password },
    });
    refreshTokenRef.current = res.refreshToken;
    await saveTokens(res.token, res.refreshToken);
    setToken(res.token);
    setUser(toSessionUser(res.user));
    setStatus('authenticated');
    // Enriquece a sessão com avatar e demais campos (login devolve o mínimo).
    try {
      const me = await apiFetch<MobileUser>('/api/mobile/me', { token: res.token });
      setUser(toSessionUser(me));
    } catch {
      // mantém os dados do login se /me falhar
    }
  }

  // Auto-cadastro (só ambiente de teste). Cria o usuário, marca o aparelho como
  // já cadastrado (trava de 1 por aparelho) e já entra.
  async function signUp(username: string, password: string, fullName: string) {
    const res = await apiFetch<LoginResponse>('/api/mobile/auth/register', {
      method: 'POST',
      body: { username, password, fullName },
    });
    refreshTokenRef.current = res.refreshToken;
    await saveTokens(res.token, res.refreshToken);
    await markDeviceRegistered(username);
    setToken(res.token);
    setUser(toSessionUser(res.user));
    setStatus('authenticated');
    try {
      const me = await apiFetch<MobileUser>('/api/mobile/me', { token: res.token });
      setUser(toSessionUser(me));
    } catch {
      // mantém os dados do registro se /me falhar
    }
  }

  async function signOut() {
    // Revoga a sessão no servidor (best-effort) antes de limpar o storage local.
    const current = refreshTokenRef.current;
    if (current) {
      try {
        await apiFetch('/api/mobile/auth/logout', { method: 'POST', body: { refreshToken: current } });
      } catch {
        // ignora — o logout local acontece de qualquer forma
      }
    }
    await clearSession();
  }

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, token, biometricEnabled, signIn, signUp, signOut, unlock, setBiometric }),
    [status, user, token, biometricEnabled],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
