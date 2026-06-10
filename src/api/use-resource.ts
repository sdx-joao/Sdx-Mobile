import { useCallback, useEffect, useState } from 'react';
import { ApiError } from './client';

function humanError(e: unknown): string {
  if (e instanceof ApiError) {
    if (e.status === 401) return 'Sessão expirada. Entre novamente.';
    if (e.status === 403) return 'Você não tem permissão para ver isto.';
    return e.message;
  }
  return 'Não foi possível conectar ao servidor.';
}

type Resource<T> = {
  data: T | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  reload: () => void;
};

/**
 * Carrega um recurso da API com estados de loading/erro e pull-to-refresh.
 * `loader` deve ser memoizado (useCallback) com suas dependências reais.
 */
export function useResource<T>(loader: () => Promise<T>): Resource<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (isRefresh: boolean) => {
      if (isRefresh) setRefreshing(true);
      setError(null);
      try {
        const result = await loader();
        setData(result);
      } catch (e) {
        setError(humanError(e));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loader],
  );

  useEffect(() => {
    setLoading(true);
    run(false);
  }, [run]);

  const reload = useCallback(() => run(true), [run]);

  return { data, loading, refreshing, error, reload };
}
