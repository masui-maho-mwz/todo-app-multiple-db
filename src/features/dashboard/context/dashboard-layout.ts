import { createContext, useContext } from 'react';

export type TodoContextData = {
  categories: { key: string; name: string }[];
  priorities: { key: string; name: string }[];
  importances: { key: string; name: string }[];
};

export type DashboardLayoutContextType = {
  todo: TodoContextData;
};

export const DashboardLayoutContext = createContext<DashboardLayoutContextType>(
  { todo: { categories: [], priorities: [], importances: [] } }
);

export const useDashboardLayoutContext = () => {
  return useContext(DashboardLayoutContext);
};
