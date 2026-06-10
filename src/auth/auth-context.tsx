import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { apiFetch } from '../api/client';
import { clearToken, getToken, saveToken } from './token-store';
import type { LoginResponse, MobileUser } from './types';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

// Shape consumido pelas telas (Home/Perfil)
export type SessionUser = {
  name: string;
  dept: string;
  unit: string;
  role: string;
  username: string;
};

function toSessionUser(u: MobileUser): SessionUser {
  return {
    name: u.fullName || u.username,
    dept: u.department || u.role,
    unit: '',
    role: u.role,
    username: u.username,
  };
}

type AuthContextValue = {
  status: AuthStatus;
  user: SessionUser | null;
  token: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<SessionUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
        setStatus('authenticated');
      } catch {
        await clearToken();
        setStatus('unauthenticated');
      }
    })();
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
  }

  async function signOut() {
    await clearToken();
    setToken(null);
    setUser(null);
    setStatus('unauthenticated');
  }

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, token, signIn, signOut }),
    [status, user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
