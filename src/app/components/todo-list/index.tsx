import { NoTodos } from "@/app/components/todo-list/no-todo";
import {
  StatusKeyEnum,
  StatusLabels,
  Todo,
  type StatusKeys
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
  handleOpenDeleteDialog
}: Props) => {
  const handleEditModal = (filteredTodos: Todo) => {
    handleOpenEditModal(filteredTodos);
  };

  if (!filteredTodos.length) {
    return <NoTodos />;
  }

  const handleStatusChange = async (todo: Todo) => {
    const newStatusKey: StatusKeys =
      todo.statusKey === StatusKeyEnum.Enum.complete
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
            : newStatusKey === StatusKeyEnum.Enum.incomplete
            ? StatusLabels.incomplete
            : StatusLabels.all
      }
    };

    await handleUpdateTodo(updatedTodo);
  };

  return (
    <>
      {filteredTodos.map((filteredTodos) => (
        <div className={styles.todoCard} key={filteredTodos.id}>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={filteredTodos.statusKey === StatusKeyEnum.Enum.complete}
              onChange={() => handleStatusChange(filteredTodos)}
              className={styles.checkbox}
            />
          </div>
          <div className={styles.todoDetails}>
            <div className={styles.descriptionWrapper}>
              <div className={styles.description}>
                {filteredTodos.description}
              </div>
            </div>
            <div className={styles.todoInfo}>
              <span className={styles.chip}>
                カテゴリー: {filteredTodos.category?.name}
              </span>
              <span className={styles.chip}>
                優先: {filteredTodos.priority?.name}
              </span>
              <span className={styles.chip}>
                重要: {filteredTodos.importance?.name}
              </span>
              <span className={styles.chip}>
                期限:
                {filteredTodos.deadline
                  ? format(parseISO(filteredTodos.deadline), "yyyy/MM/dd")
                  : "未設定"}
              </span>
            </div>
          </div>
          <div className={styles.actionIcons}>
            <button
              className={styles.editButton}
              onClick={() => handleEditModal(filteredTodos)}
            >
              <EditIcon fontSize="small" />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleOpenDeleteDialog(filteredTodos.id)}
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
