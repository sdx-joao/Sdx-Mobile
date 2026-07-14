const DEFAULT_API_URL = 'http://10.32.20.220:3000';
const REQUEST_TIMEOUT_MS = 15000;

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_SDX_API_URL?.replace(/\/$/, '') || DEFAULT_API_URL;

export const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV || 'development';
/** Build de teste (ambiente de teste) — habilita recursos só de teste, ex.: auto-cadastro. */
export const IS_TEST_BUILD = APP_ENV === 'test';

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

let unauthorizedHandler: (() => void | Promise<void>) | null = null;

export function setUnauthorizedHandler(handler: (() => void | Promise<void>) | null) {
  unauthorizedHandler = handler;
}

export function notifyUnauthorized() {
  void unauthorizedHandler?.();
}

/**
 * Handler de refresh silencioso. Registrado pelo auth-context: troca o refresh
 * token por um novo access token (rotacionando o refresh). Retorna o novo
 * access token, ou null se o refresh também falhou (aí sim cai para a senha).
 * Deve ser deduplicado no auth-context (uma troca em voo por vez).
 */
let refreshHandler: (() => Promise<string | null>) | null = null;

export function setRefreshHandler(handler: (() => Promise<string | null>) | null) {
  refreshHandler = handler;
}

type FetchOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  token?: string | null;
};

async function doFetch(
  url: string,
  body: unknown,
  token: string | null | undefined,
  headers: HeadersInit | undefined,
  rest: Omit<RequestInit, 'body' | 'headers'>,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...rest,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        // Identifica o app pro backend: single-session mobile é POR APP, então
        // o login do Servus não derruba a sessão do Prontus (e vice-versa).
        'X-Sdx-App': 'servus',
        // Anuncia suporte a refresh token: o backend emite access token curto
        // (renovável) em vez do token longo legado.
        'X-Sdx-Caps': 'refresh',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Tempo limite ao conectar com o servidor Scandex.', 408, 'timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { body, token, headers, ...rest } = options;
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  let res = await doFetch(url, body, token, headers, rest);

  // Access token expirado (~1h): tenta um refresh silencioso e repete a request
  // UMA vez com o novo token. Só entra aqui se a chamada usava Bearer (o próprio
  // /refresh não manda token, então não entra em laço).
  if (res.status === 401 && token && refreshHandler) {
    const newToken = await refreshHandler();
    if (newToken) {
      res = await doFetch(url, body, newToken, headers, rest);
    }
  }

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    if (res.status === 401 && token) {
      notifyUnauthorized();
    }
    const message =
      (payload && (payload.message || payload.error)) || `Erro ${res.status}`;
    throw new ApiError(message, res.status, payload?.code);
  }

  return payload as T;
}
