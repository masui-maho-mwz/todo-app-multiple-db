'use client';
import { useContext, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { TodoViewModel } from '@/core/types';
import { TodoList } from '@/features/dashboard/components/todo-list';
import { RoundTabs } from '@/components/tabs/round-tabs';
import { EditTodoModal } from '@/features/dashboard/components/edit-todo-modal';
import { DeleteTodoDialog } from '@/features/dashboard/components/delete-todo-dialog';
import { DashboardLayoutContext } from './layout';

const Home = () => {
  const context = useContext(DashboardLayoutContext);

  const [status, setStatus] = useState('');
  const [selectedTodos, setSelectedTodos] =
    useState<TodoViewModel[]>(dummy_todos);

  const [editingTodo, setEditingTodo] = useState<TodoViewModel | null>(null);
  const handleClickOpenEditModal = (todo: TodoViewModel) => {
    setEditingTodo(todo);
  };
  const handleClickCloseEditModal = () => {
    setEditingTodo(null);
  };

  const [deletingTodo, setDeletingTodo] = useState<TodoViewModel | null>(null);
  const handleClickOpenDeleteModal = (todo: TodoViewModel) => {
    setDeletingTodo(todo);
  };
  const handleClickCloseDeleteModal = () => {
    setDeletingTodo(null);
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
      <div className={styles.contents}>
        <RoundTabs
          value={status}
          items={dummy_statuses}
          onChange={handleClickStatusTab}
        />
        <TodoList
          todos={selectedTodos}
          onClickEdit={handleClickOpenEditModal}
          onDeleteEdit={handleClickOpenDeleteModal}
        />
      </div>
      <EditTodoModal
        todo={editingTodo}
        categories={context.categories}
        priorities={context.priorities}
        importances={context.importances}
        isOpen={Boolean(editingTodo)}
        onSubmit={() => alert('Edit Submit !!')}
        onClose={handleClickCloseEditModal}
      />
      <DeleteTodoDialog
        todo={deletingTodo}
        isOpen={Boolean(deletingTodo)}
        onDelete={(todoId: string) => {
          alert(`${todoId} を削除！`);
        }}
        onClose={handleClickCloseDeleteModal}
      />
    </div>
  );
};

// TODO: 一旦ダミーの値を使用。後でAPIから取得するように変更する
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
