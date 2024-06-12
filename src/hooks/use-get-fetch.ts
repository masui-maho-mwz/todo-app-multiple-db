import { useEffect, useState } from 'react';

export const useGetFetch = <T>(path: string) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(path, {
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

        // TODO: 次回ここから、ViewModel 作ったりする
        const data: T = await res.json();
        setData(data);
      })
      .catch((error) => {
        throw new Error('Failed to fetch');
      });
  }, [path]);

  return { data };
};
