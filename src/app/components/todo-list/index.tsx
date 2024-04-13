import { updateTodo } from "@/app/operations";
import { Todo, type StatusKeys } from "@/app/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format, parseISO } from "date-fns";
import { FC } from "react";
import styles from "./styles.module.css";

type Props = {
  todos: Todo[];
  openEditModal: (todo: Todo) => void;
  handleDeleteTodo: (id: string) => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
};

export const TodoList: FC<Props> = ({
  todos,
  handleDeleteTodo,
  openEditModal,
  onUpdateTodo,
}) => {
  if (!todos.length) {
    return <div>Todoがありません。</div>;
  }
  const handleStatusChange = async (todo: Todo) => {
    const currentStatusKey = todo.status?.key || "incomplete";
    const newStatusKey: StatusKeys =
      currentStatusKey === "complete" ? "incomplete" : "complete";

    const updatedTodo = {
      ...todo,
      status: { ...todo.status, key: newStatusKey },
    };

    try {
      const updatedResponse = await updateTodo(updatedTodo);
      onUpdateTodo(updatedResponse);
    } catch (error) {
      alert(
        `ステータスの更新に失敗しました。もう一度試してください。: ${error}`
      );
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <div className={styles.todoCard} key={todo.id}>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={todo.status?.key === "complete"}
              onChange={() => handleStatusChange(todo)}
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
                ? format(parseISO(todo.deadline), "yyyy/MM/dd")
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