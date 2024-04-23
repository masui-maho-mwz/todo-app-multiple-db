import { NoTodos } from "@/app/components/todo-list/no-todo";
import { updateTodo } from "@/app/operations";
import {
  StatusKeyEnum,
  StatusLabels,
  Todo,
  type StatusKeys,
} from "@/app/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format, parseISO } from "date-fns";
import styles from "./styles.module.css";

type Props = {
  filteredTodos: Todo[];
  handleUpdateTodo: (updatedTodo: Todo) => void;
  handleOpenEditModal: (todo: Todo) => void;
  handleOpenDeleteDialog: (todoId: string) => void;
};

export const TodoList = ({
  filteredTodos,
  handleUpdateTodo,
  handleOpenEditModal,
  handleOpenDeleteDialog,
}: Props) => {
  const handleEditModal = (filteredTodos: Todo) => {
    handleOpenEditModal(filteredTodos);
  };
  const todos = filteredTodos || [];

  if (!todos.length) {
    return <NoTodos />;
  }

  const handleStatusChange = async (todo: Todo) => {
    const currentStatusKey = todo.statusKey || StatusKeyEnum.Enum.incomplete;
    const newStatusKey: StatusKeys =
      currentStatusKey === StatusKeyEnum.Enum.complete
        ? StatusKeyEnum.Enum.incomplete
        : StatusKeyEnum.Enum.complete;

    const updatedTodo = {
      ...todo,
      statusKey: newStatusKey,
      status: {
        key: newStatusKey,
        name:
          newStatusKey === StatusKeyEnum.Enum.complete
            ? StatusLabels.complete
            : StatusLabels.incomplete,
      },
    };

    updateTodo(updatedTodo)
      .then((updatedResponse) => {
        handleUpdateTodo(updatedResponse);
      })
      .catch((error) => {
        alert(
          `ステータスの更新に失敗しました。もう一度試してください。: ${error}`
        );
      });
  };

  return (
    <>
      {filteredTodos.map((todo) => (
        <div className={styles.todoCard} key={todo.id}>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={todo.statusKey === StatusKeyEnum.Enum.complete}
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
                期限:
                {todo.deadline
                  ? format(parseISO(todo.deadline), "yyyy/MM/dd")
                  : "未設定"}
              </span>
            </div>
          </div>
          <div className={styles.actionIcons}>
            <button
              className={styles.editButton}
              onClick={() => handleEditModal(todo)}
            >
              <EditIcon fontSize="small" />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleOpenDeleteDialog(todo.id)}
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
