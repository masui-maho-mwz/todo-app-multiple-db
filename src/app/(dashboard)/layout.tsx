'use client';
import { createContext, useEffect, useState } from 'react';
import {
  AddTodoModal,
  FormData,
} from '@/features/dashboard/components/add-todo-modal';
import { Sidebar } from '@/features/dashboard/components/layout/sidebar';
import styles from './layout.module.css';
import { TodosMetadataGetViewModel } from '@/view-model/todo';
import { useQueryFetch } from '@/hooks/use-query-fetch';
import { useMutationFetch } from '@/hooks/use-mutation-fetch';

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

  const { data: queryData, query } = useQueryFetch<TodosMetadataGetViewModel>(
    '/api/todos/metadata'
  );

  const { data: mutateData, mutate } = useMutationFetch<
    TodosMetadataGetViewModel,
    FormData
  >('/api/todos', 'POST');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleClickOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleClickCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSubmit = (data: FormData) => {
    mutate(data);
  };

  useEffect(() => {
    query();
    // MEMO: マウント時のみ実行させたいため、空のdepsを指定
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!queryData) {
      setContext(initialContext);
      return;
    }
    setContext({
      categories: queryData.categories,
      priorities: queryData.priorities,
      importances: queryData.importances,
    });
  }, [queryData]);

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
        onSubmit={handleSubmit}
        onClose={handleClickCloseAddModal}
      />
    </div>
  );
}
