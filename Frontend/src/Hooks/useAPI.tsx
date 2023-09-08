import { useEffect, useState } from 'react';

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useApi<T>(endpoint: string): ApiResponse<T[]> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://45.235.53.125:8080/api/produto`);
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}
