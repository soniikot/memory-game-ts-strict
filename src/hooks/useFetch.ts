import { useState, useEffect } from 'react';
import { ICatData, TError, IUseFetch } from '../types/common';

const URL = 'https://api.thecatapi.com/v1/images/search?limit=10';

function useFetch(): IUseFetch {
  const [data, setData] = useState<ICatData[]>([]); // Boolean([]) ?
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<TError>(null);

  async function getData() {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setIsLoading(false);
      setData(json);
    } catch (err) {
      const fetchError = err as Error;
      setError(fetchError.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { data, isLoading, error };
}

export default useFetch;
