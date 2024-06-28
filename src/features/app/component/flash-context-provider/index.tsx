'use client';
import { FlashContext, FlashData } from '@/features/app/context/flash';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export const FlashContextProvider = ({ children }: Props) => {
  const [flashData, setFlashData] = useState<FlashData | null>(null);

  const setFlash = (data: FlashData) => {
    setFlashData(data);

    setTimeout(() => {
      setFlashData(null);
    }, 1000);
  };

  return (
    <FlashContext.Provider value={{ data: flashData, setFlash }}>
      {children}
    </FlashContext.Provider>
  );
};
