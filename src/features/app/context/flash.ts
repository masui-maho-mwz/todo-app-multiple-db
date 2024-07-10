import { createContext, useContext } from 'react';

export type FlashData = { stasus: 'success'; message: string; type: 'todo' };

type FlashContextType = {
  data: FlashData | null;
  setFlash: (data: FlashData) => void;
};

export const FlashContext = createContext<FlashContextType>({
  data: null,
  setFlash: () => {},
});

export const useFlashContext = () => {
  return useContext(FlashContext);
};
