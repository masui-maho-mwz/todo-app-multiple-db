import { StatusTabs } from "@/app/components/status-tabs";
import { TodoList } from "@/app/components/todo-list";
import type { StatusFilter, Todo } from "@/app/types";
import styles from "./styles.module.css";

interface MainProps {
  statusFilter: StatusFilter;
  filteredTodos: Todo[];
  handleFilterChange: (newFilter: StatusFilter) => Promise<void>;
  openEditModal: (todo: Todo) => void;
  handleDeleteTodo: (todoId: string) => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
}

export const Main = ({
  statusFilter,
  filteredTodos,
  handleFilterChange,
  openEditModal,
  handleDeleteTodo,
  onUpdateTodo,
}: MainProps) => {
  return (
    <div className={styles.todoListContainer}>
      <div>
        <StatusTabs
          setStatusFilter={handleFilterChange}
          activeFilter={statusFilter}
        />
        <TodoList
          todos={filteredTodos}
          openEditModal={openEditModal}
          handleDeleteTodo={handleDeleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      </div>
    </div>
  );
};
