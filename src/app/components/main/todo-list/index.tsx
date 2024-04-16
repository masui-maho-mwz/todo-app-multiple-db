import { NoTodos } from "@/app/components/main/todo-list/no-todo";
import { updateTodo } from "@/app/operations";
import { Todo, type StatusKeys } from "@/app/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format, parseISO } from "date-fns";
import styles from "./styles.module.css";

type Props = {
  todos: Todo[];
  openEditModal: (todo: Todo) => void;
  handleDeleteTodo: (id: string) => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
};

export const TodoList = ({
  todos,
  handleDeleteTodo,
  openEditModal,
  onUpdateTodo,
}: Props) => {
  if (!todos.length) {
    return <NoTodos />;
  }
  const handleStatusChange = async (todo: Todo) => {
    const currentStatusKey = todo.statusKey || "incomplete";
    const newStatusKey: StatusKeys =
      currentStatusKey === "complete" ? "incomplete" : "complete";

    const updatedTodo = {
      ...todo,
      statusKey: newStatusKey,
      status: {
        key: newStatusKey,
        name: newStatusKey === "complete" ? "完了" : "未完了",
      },
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
              checked={todo.statusKey === "complete"}
              onChange={() => handleStatusChange(todo)}
              className={styles.checkbox}
            />
          </div>
          <div className={styles.todoDetails}>
            <div className={styles.descriptionWrapper}>
              <div className={styles.description}>{todo.description}</div>
            </div>
            <div className={styles.todoInfo}>
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
            </div>
          </div>
          <div className={styles.actionIcons}>
            <button
              className={styles.editButton}
              onClick={() => openEditModal(todo)}
            >
              <EditIcon fontSize="small" />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
