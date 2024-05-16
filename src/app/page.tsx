'use client';
import { Sidebar } from '@/app/components/sidebar';
import { useState } from 'react';
import styles from './styles.module.css';
import { AddTodoModal } from './components/forms/add-todo-modal';

// TODO: 一旦ダミーの値を使用。後でAPIから取得するように変更する
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

const Home = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleClickOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleClickCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleClickOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleClickCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.root}>
      {/* {isLoading && <LoadingOverlay />} */}
      <div className={styles.container}>
        <Sidebar onClickOpenAdd={handleClickOpenAddModal} />
        {/* <div className={styles.list}>
          <div className={styles.item}>
            <StatusTabs
              handleFilterChange={handleFilterChange}
              activeFilter={activeFilter}
            />
            <TodoList
              filteredTodos={filteredTodos}
              handleUpdateTodo={handleUpdateTodo}
              handleOpenEditModal={openEditModal}
              handleOpenDeleteDialog={openDeleteDialog}
            />
          </div>
        </div> */}
      </div>
      <AddTodoModal
        categories={dummy_categories}
        priorities={dummy_priorities}
        importances={dummy_importances}
        isOpen={isAddModalOpen}
        onSubmit={() => alert('Add Submit')}
        onClickCloseModal={handleClickCloseAddModal}
      />
      {/* <EditTodoModal
        isOpen={isEditModalOpen}
        categories={categories}
        priorities={priorities}
        importances={importances}
        todo={editingTodo}
        onClickUpdate={(updatedTodo: Todo) => {
          handleUpdateTodo(updatedTodo);
          closeEditModal();
        }}
        onClose={closeEditModal}
      />
      <DeleteTodoDialog
        isOpen={deletingTodoId !== null}
        onClickDelete={(todoId: string) => {
          handleDeleteTodo(todoId);
          closeDeleteDialog();
        }}
        onClose={closeDeleteDialog}
        todoId={deletingTodoId}
      /> */}
    </div>
  );
};

export default Home;
