'use client';
import { useState } from 'react';
import { AddTodoModal } from '@/features/dashboard/components/add-todo-modal';
import { Sidebar } from '@/features/dashboard/components/layout/sidebar';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleClickOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleClickCloseAddModal = () => {
    setIsAddModalOpen(false);
  };
  return (
    <div className={styles.root}>
      {/* {isLoading && <LoadingOverlay />} */}
      <div className={styles.container}>
        <Sidebar onClickOpenAdd={handleClickOpenAddModal} />
        <div className={styles.main}>{children}</div>
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
