import type { StatusKeys, Todo } from "@/app/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  todos: Todo[];
  handleUpdateTodo: (id: string, newStatusKey: StatusKeys) => void;
  handleDeleteTodo: (id: string) => void;
  openEditModal: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleUpdateTodo,
  handleDeleteTodo,
  openEditModal,
}) => {
  const [pendingUpdate, setPendingUpdate] = useState<{
    id: string;
    newStatusKey: StatusKeys;
  } | null>(null);

  useEffect(() => {
    if (pendingUpdate) {
      handleUpdateTodo(pendingUpdate.id, pendingUpdate.newStatusKey);
      setPendingUpdate(null);
    }
  }, [pendingUpdate, handleUpdateTodo]);

  if (!Array.isArray(todos) || todos.length === 0) {
    return <div>Todoがありません。</div>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <div className={styles.todoCard} key={todo.id}>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={todo.status?.key === "complete"}
              onChange={() => {
                if (todo.status) {
                  const newStatusKey =
                    todo.status.key === "complete" ? "incomplete" : "complete";
                  setPendingUpdate({ id: todo.id, newStatusKey });
                }
              }}
              className={styles.checkbox}
            />
            <div>{todo.description}</div>
          </div>
          <div className={styles.wrapper}>
            <span className={styles.chip}>
              カテゴリー: {todo.category?.name}
            </span>
            <span className={styles.chip}>優先: {todo.priority?.name}</span>
            <span className={styles.chip}>重要: {todo.importance?.name}</span>
            <span className={styles.chip}>
              期限:{" "}
              {todo.deadline
                ? new Date(todo.deadline).toLocaleDateString()
                : "未設定"}
            </span>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <DeleteIcon />
            </button>
            <button
              className={styles.editButton}
              onClick={() => openEditModal(todo)}
            >
              <EditIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
