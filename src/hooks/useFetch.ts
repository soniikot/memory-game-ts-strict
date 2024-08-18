import { useState, useEffect } from 'react';
import { ICatData, TError, IUseFetch } from '../types/common';

function useFetch(): IUseFetch {
  const [data, setData] = useState<ICatData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<TError>(null);

  async function getData() {
    const url = 'https://api.thecatapi.com/v1/images/search?limit=10';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setIsLoading(false);
      setData(json);
    } catch (fetchError) {
      setError(fetchError.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { data, isLoading, error };
}

export default useFetch;
