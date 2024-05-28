'use client';
import { Sidebar } from '@/app/components/sidebar';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { AddTodoModal } from './components/forms/add-todo-modal';
import { TodoList } from './components/todo-list';
import { RoundTabs } from '@/components/tabs/round-tabs';
import { TodoViewModel } from '@/core/types';
import { EditTodoModal } from './components/forms/edit-todo-modal';

const Home = () => {
  const [status, setStatus] = useState('');
  const [selectedTodos, setSelectedTodos] =
    useState<TodoViewModel[]>(dummy_todos);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleClickOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleClickCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const [editingTodo, setEditingTodo] = useState<TodoViewModel | null>(null);
  const handleClickOpenEditModal = (todo: TodoViewModel) => {
    setEditingTodo(todo);
  };
  const handleClickCloseEditModal = () => {
    setEditingTodo(null);
  };

  const handleClickStatusTab = (value: string) => {
    setStatus(value);
  };

  useEffect(() => {
    if (status === '') {
      setSelectedTodos(dummy_todos);
    } else {
      setSelectedTodos(
        dummy_todos.filter((todo) => todo.status.key === status)
      );
    }
  }, [status]);

  return (
    <div className={styles.root}>
      {/* {isLoading && <LoadingOverlay />} */}
      <div className={styles.container}>
        <Sidebar onClickOpenAdd={handleClickOpenAddModal} />
        <div className={styles.contents}>
          <RoundTabs
            value={status}
            items={dummy_statuses}
            onChange={handleClickStatusTab}
          />
          <TodoList
            todos={selectedTodos}
            onClickEdit={handleClickOpenEditModal}
          />
        </div>
      </div>
      <AddTodoModal
        categories={dummy_categories}
        priorities={dummy_priorities}
        importances={dummy_importances}
        isOpen={isAddModalOpen}
        onSubmit={() => alert('Add Submit !!')}
        onClickCloseModal={handleClickCloseAddModal}
      />
      <EditTodoModal
        todo={editingTodo}
        categories={dummy_categories}
        priorities={dummy_priorities}
        importances={dummy_importances}
        isOpen={Boolean(editingTodo)}
        onSubmit={() => alert('Edit Submit !!')}
        onClickCloseModal={handleClickCloseEditModal}
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
const dummy_statuses = [
  { value: '', label: '全て' },
  { value: 'incomplete', label: '未完了' },
  { value: 'completed', label: '完了' },
];
const dummy_todos: TodoViewModel[] = [
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
    status: { key: 'completed', name: '完了' },
  },
];

export default Home;
