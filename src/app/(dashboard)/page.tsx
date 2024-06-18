'use client';
import { useContext, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { TodoList } from '@/features/dashboard/components/todo-list';
import { RoundTabs } from '@/components/tabs/round-tabs';
import { EditTodoModal } from '@/features/dashboard/components/edit-todo-modal';
import { DeleteTodoDialog } from '@/features/dashboard/components/delete-todo-dialog';
import { DashboardLayoutContext } from './layout';
import { useGetFetch } from '@/hooks/use-get-fetch';
import {
  TodosGetViewModel,
  TodosStatusesGetViewModel,
} from '@/view-model/todo';
import { TodoUiModel } from '@/features/dashboard/ui-models';

const Home = () => {
  const context = useContext(DashboardLayoutContext);

  const { data: todosData, query: todosQuery } =
    useGetFetch<TodosGetViewModel>('/api/todos');

  const { data: statusesData, query: statusesQuery } =
    useGetFetch<TodosStatusesGetViewModel>('/api/todos/statuses');

  const statusItems = statusesData?.statuses.map((status) => ({
    value: status.key,
    label: status.name,
  }));

  const [status, setStatus] = useState('');
  const [selectedTodos, setSelectedTodos] = useState<TodoUiModel[] | null>(
    null
  );

  const [editingTodo, setEditingTodo] = useState<TodoUiModel | null>(null);
  const handleClickOpenEditModal = (todo: TodoUiModel) => {
    setEditingTodo(todo);
  };
  const handleClickCloseEditModal = () => {
    setEditingTodo(null);
  };

  const [deletingTodo, setDeletingTodo] = useState<TodoUiModel | null>(null);
  const handleClickOpenDeleteModal = (todo: TodoUiModel) => {
    setDeletingTodo(todo);
  };
  const handleClickCloseDeleteModal = () => {
    setDeletingTodo(null);
  };

  const handleClickStatusTab = (value: string) => {
    setStatus(value);
  };

  useEffect(() => {
    todosQuery();
    statusesQuery();
    // MEMO: マウント時のみ実行させたいため、空のdepsを指定
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!todosData) return;

    if (status === '') {
      setSelectedTodos(todosData.todos);
    } else {
      setSelectedTodos(
        todosData.todos.filter((todo) => todo.status.key === status)
      );
    }
  }, [status, todosData]);

  return (
    <div className={styles.root}>
      <div className={styles.contents}>
        {statusItems && (
          <RoundTabs
            value={status}
            items={[{ value: '', label: '全て' }, ...statusItems]}
            onChange={handleClickStatusTab}
          />
        )}
        {selectedTodos && (
          <TodoList
            todos={selectedTodos}
            onClickEdit={handleClickOpenEditModal}
            onDeleteEdit={handleClickOpenDeleteModal}
          />
        )}
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

export default Home;
