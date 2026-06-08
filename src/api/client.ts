const DEFAULT_API_URL = 'http://10.32.20.220:3000';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_SDX_API_URL?.replace(/\/$/, '') || DEFAULT_API_URL;

export async function apiFetch(path: string, init?: RequestInit) {
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  return fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
}
