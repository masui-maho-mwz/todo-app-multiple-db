import { useState } from 'react';

export const useQueryFetch = <T>(path: string) => {
  const [data, setData] = useState<T | null>(null);

  const query = () => {
    return fetch(path, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('response error');
        }

        const data: T = await res.json();
        setData(data);
      })
      .catch((error) => {
        throw new Error('Failed to fetch');
      });
  };

  return { data, query };
};
