import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { apiFetch, setUnauthorizedHandler } from '../api/client';
import { clearToken, getToken, getBiometricEnabled, markDeviceRegistered, saveToken, setBiometricPref } from './token-store';
import { authenticateBiometric, isBiometricAvailable } from './biometrics';
import type { LoginResponse, MobileCapabilities, MobileUser } from './types';

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

  async function clearSession() {
    await clearToken();
    setToken(null);
    setUser(null);
    setStatus('unauthenticated');
  }

  // Bootstrap: reusa o token salvo e revalida em /api/mobile/me
  useEffect(() => {
    (async () => {
      try {
        const stored = await getToken();
        if (!stored) {
          setStatus('unauthenticated');
          return;
        }
        const me = await apiFetch<MobileUser>('/api/mobile/me', { token: stored });
        setToken(stored);
        setUser(toSessionUser(me));
        // Se a biometria está ligada e disponível, entra travado (LockScreen pede a digital).
        const bioOn = await getBiometricEnabled();
        setBiometricEnabled(bioOn);
        setStatus(bioOn && (await isBiometricAvailable()) ? 'locked' : 'authenticated');
      } catch {
        await clearToken();
        setStatus('unauthenticated');
      }
    })();
  }, []);

  const unlock = async (): Promise<boolean> => {
    const ok = await authenticateBiometric('Desbloquear o Servus');
    if (ok) setStatus('authenticated');
    return ok;
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

  useEffect(() => {
    setUnauthorizedHandler(() => {
      void clearSession();
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  async function signIn(username: string, password: string) {
    const res = await apiFetch<LoginResponse>('/api/mobile/auth/login', {
      method: 'POST',
      body: { username, password },
    });
    await saveToken(res.token);
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
    await saveToken(res.token);
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
