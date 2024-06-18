'use client';
import { createContext, useEffect, useState } from 'react';
import { AddTodoModal } from '@/features/dashboard/components/add-todo-modal';
import { Sidebar } from '@/features/dashboard/components/layout/sidebar';
import styles from './layout.module.css';
import { TodosMetadataGetViewModel } from '@/view-model/todo';
import { useGetFetch } from '@/hooks/use-get-fetch';

type Props = {
  children: React.ReactNode;
};

type DashboardLayoutContextType = {
  categories: { key: string; name: string }[];
  priorities: { key: string; name: string }[];
  importances: { key: string; name: string }[];
};

const initialContext: DashboardLayoutContextType = {
  categories: [],
  priorities: [],
  importances: [],
};

export const DashboardLayoutContext =
  createContext<DashboardLayoutContextType>(initialContext);

export default function DashboardLayout({ children }: Props) {
  const [context, setContext] =
    useState<DashboardLayoutContextType>(initialContext);

  const { data, query } = useGetFetch<TodosMetadataGetViewModel>(
    '/api/todos/metadata'
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleClickOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleClickCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    query();
  }, [query]);

  useEffect(() => {
    if (!data) {
      setContext(initialContext);
      return;
    }
    setContext({
      categories: data.categories,
      priorities: data.priorities,
      importances: data.importances,
    });
  }, [data]);

  return (
    <div className={styles.root}>
      {/* {isLoading && <LoadingOverlay />} */}
      <div className={styles.container}>
        <Sidebar onClickOpenAdd={handleClickOpenAddModal} />
        <div className={styles.main}>
          <DashboardLayoutContext.Provider value={context}>
            {children}
          </DashboardLayoutContext.Provider>
        </div>
      </div>
      <AddTodoModal
        categories={context.categories}
        priorities={context.priorities}
        importances={context.importances}
        isOpen={isAddModalOpen}
        onSubmit={() => alert('Add Submit !!')}
        onClose={handleClickCloseAddModal}
      />
    </div>
  );
}
