import { useState } from 'react';

export const useMutationFetch = <T, U>(
  path: string,
  method: 'POST' | 'PUT' | 'DELETE'
) => {
  const [data, setData] = useState<T | null>(null);

  // MEMO: data は使用箇所によって変わってくるため、 any で型を指定
  const mutate = (data?: U) => {
    return fetch(path, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

  return { data, mutate };
};
