import { useState } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const BASE_URL = 'http://45.235.53.125:8080';

export function useCustomApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (method: HttpMethod, requestBody?: any) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody ? JSON.stringify(requestBody) : undefined,
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProduto = () => fetchData('GET');
  const getCategoria = () => fetchData('GET');

  const postProduto = (requestBody: T) => fetchData('POST', requestBody);
  const postcategoria = (requestBody: T) => fetchData('POST', requestBody);

  const updateProduto = (requestBody: T) => fetchData('PUT', requestBody);
  const updatecategoria = (requestBody: T) => fetchData('PUT', requestBody);

  const deleteProduto = () => fetchData('DELETE');
  const deletecategoria = () => fetchData('DELETE');

  const patchProduto = (requestBody: Partial<T>) => fetchData('PATCH', requestBody);
  const patchCategoria = (requestBody: Partial<T>) => fetchData('PATCH', requestBody);

  return {
    data,
    loading,
    error,
    getProduto,
    getCategoria,
    postProduto,
    postcategoria,
    updateProduto,
    updatecategoria,
    deleteProduto,
    deletecategoria,
    patchProduto,
    patchCategoria,
    fetchData,
  };
}
