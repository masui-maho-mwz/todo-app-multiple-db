'use client';
import { useEffect, useState } from 'react';
import {
  AddTodoModal,
  FormData,
} from '@/features/dashboard/components/add-todo-modal';
import { Sidebar } from '@/features/dashboard/components/layout/sidebar';
import styles from './layout.module.css';
import { TodosMetadataGetViewModel } from '@/view-model/todo';
import { useQueryFetch } from '@/hooks/use-query-fetch';
import { useMutationFetch } from '@/hooks/use-mutation-fetch';
import {
  DashboardLayoutContext,
  DashboardLayoutContextType,
  TodoContextData,
} from '@/features/dashboard/context/dashboard-layout';
import { useFlashContext } from '@/features/app/context/flash';

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { data, setFlash } = useFlashContext();

  const [context, setContext] = useState<DashboardLayoutContextType>({
    todo: initialTodoData,
  });

  const { data: queryData, query } = useQueryFetch<TodosMetadataGetViewModel>(
    '/api/todos/metadata'
  );

  const { data: mutateData, mutate } = useMutationFetch<
    TodosMetadataGetViewModel,
    FormData
  >('/api/todos', 'POST');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleCloseAddModal = () => {
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
      setContext({ ...context, todo: initialTodoData });
      return;
    }
    setContext({
      ...context,
      todo: {
        categories: queryData.categories,
        priorities: queryData.priorities,
        importances: queryData.importances,
      },
    });
    // MEMO: todo関連のデータを取得した時のみ実行させたいため、 queryData のみを指定
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  useEffect(() => {
    if (mutateData) {
      handleCloseAddModal();
      setFlash({
        stasus: 'success',
        message: '新規 ToDo を追加しました',
        type: 'todo',
      });
    }
    // MEMO: todo関連の mutation 処理が発生した場合のみ実行させたいため、 mutateData のみを指定
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutateData]);

  return (
    <div className={styles.root}>
      {/* {isLoading && <LoadingOverlay />} */}
      <div className={styles.container}>
        <Sidebar onClickOpenAdd={handleOpenAddModal} />
        <div className={styles.main}>
          <DashboardLayoutContext.Provider value={context}>
            {children}
          </DashboardLayoutContext.Provider>
        </div>
      </div>
      <AddTodoModal
        categories={context.todo.categories}
        priorities={context.todo.priorities}
        importances={context.todo.importances}
        isOpen={isAddModalOpen}
        onSubmit={handleSubmit}
        onClose={handleCloseAddModal}
      />
    </div>
  );
}

const initialTodoData: TodoContextData = {
  categories: [],
  priorities: [],
  importances: [],
};
