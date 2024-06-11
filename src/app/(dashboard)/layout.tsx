'use client';
import { createContext, useEffect, useState } from 'react';
import { AddTodoModal } from '@/features/dashboard/components/add-todo-modal';
import { Sidebar } from '@/features/dashboard/components/layout/sidebar';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
};

type DashboardLayoutContextType = {
  categories: { key: string; name: string }[];
  priorities: { key: string; name: string }[];
  importances: { key: string; name: string }[];
};

export const DashboardLayoutContext = createContext<DashboardLayoutContextType>(
  {
    categories: [],
    priorities: [],
    importances: [],
  }
);

export default function DashboardLayout({ children }: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleClickOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleClickCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const [categories, setCategories] =
    useState<{ key: string; name: string }[]>();
  const [priorities, setPriorities] =
    useState<{ key: string; name: string }[]>();
  const [importances, setImportances] =
    useState<{ key: string; name: string }[]>();

  useEffect(() => {
    const importaces = fetch('/todos/metadata', {
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
        const data = await res.json<FetchTodosResponse>();
        setPriorities(data.priorities);
      })
      .catch((error) => {
        throw new Error('Failed to fetch');
      });
  }, []);

  useEffect(() => {}, [categories, priorities, importances]);

  return (
    <div className={styles.root}>
      {/* {isLoading && <LoadingOverlay />} */}
      <div className={styles.container}>
        <Sidebar onClickOpenAdd={handleClickOpenAddModal} />
        <div className={styles.main}>
          <DashboardLayoutContext.Provider
            value={{
              categories: dummy_categories,
              priorities: dummy_priorities,
              importances: dummy_importances,
            }}
          >
            {children}
          </DashboardLayoutContext.Provider>
        </div>
      </div>
      <AddTodoModal
        categories={dummy_categories}
        priorities={dummy_priorities}
        importances={dummy_importances}
        isOpen={isAddModalOpen}
        onSubmit={() => alert('Add Submit !!')}
        onClose={handleClickCloseAddModal}
      />
    </div>
  );
}

const dummy_categories = [
  { key: 'hoge', name: 'Hoge' },
  { key: 'fuga', name: 'Fuga' },
];
const dummy_priorities = [
  { key: 'hoge_priorities', name: 'Hoge Priorities' },
  { key: 'fuga_priorities', name: 'Fuga Priorities' },
];
const dummy_importances = [
  { key: 'hoge_importances', name: 'Hoge Importances' },
  { key: 'fuga_importances', name: 'Fuga Importances' },
];
