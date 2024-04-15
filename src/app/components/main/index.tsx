import { StatusTabs } from "@/app/components/main/status-tabs";
import { TodoList } from "@/app/components/main/todo-list";
import type { StatusFilter, Todo } from "@/app/types";
import styles from "./styles.module.css";

type Props = {
  statusFilter: StatusFilter;
  filteredTodos: Todo[];
  handleFilterChange: (newFilter: StatusFilter) => Promise<void>;
  openEditModal: (todo: Todo) => void;
  handleDeleteTodo: (todoId: string) => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
};

export const Main = ({
  statusFilter,
  filteredTodos,
  handleFilterChange,
  openEditModal,
  handleDeleteTodo,
  onUpdateTodo,
}: Props) => {
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
