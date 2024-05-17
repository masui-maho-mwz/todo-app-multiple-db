'use client';
import { Sidebar } from '@/app/components/sidebar';
import { useState } from 'react';
import styles from './styles.module.css';
import { AddTodoModal } from './components/forms/add-todo-modal';
import { TodoList } from './components/todo-list';

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
const dummy_todos = [
  {
    id: '1',
    description: 'Dummy Todo 1',
    deadline: '2021-12-31',
    category: { key: 'hoge', name: 'Hoge' },
    priority: { key: 'hoge_priorities', name: 'Hoge Priorities' },
    importance: { key: 'hoge_importances', name: 'Hoge Importances' },
    status: { key: 'incomplete', name: '未完了' },
  },
  {
    id: '2',
    description: 'Dummy Todo 2',
    deadline: undefined,
    category: { key: 'hoge', name: 'Hoge' },
    priority: { key: 'hoge_priorities', name: 'Hoge Priorities' },
    importance: { key: 'hoge_importances', name: 'Hoge Importances' },
    status: { key: 'incomplete', name: '未完了' },
  },
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
        <div className={styles.contents}>
          <TodoList todos={dummy_todos} />
          <h2 className={styles.title}>おすすめアプリのバナー </h2>
        </div>
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
