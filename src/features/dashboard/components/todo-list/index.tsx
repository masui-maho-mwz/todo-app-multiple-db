import { NoTodos } from '@/features/dashboard/components/todo-list/no-todo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './styles.module.css';
import { TodoUiModel } from '@/features/dashboard/ui-models';

type Props = {
  todos: TodoUiModel[];
  onClickEdit: (todo: TodoUiModel) => void;
  onDeleteEdit: (todo: TodoUiModel) => void;
};

export const TodoList = ({ todos, onClickEdit, onDeleteEdit }: Props) => {
  if (!todos.length) {
    return <NoTodos />;
  }

  return (
    <div className={styles.root}>
      {todos.map((todo) => (
        <div className={styles.todo} key={todo.id}>
          <div className={styles.input}>
            <input
              type="checkbox"
              // checked={todo.status.key === StatusKeyEnum.Enum.complete}
              className={styles.checkbox}
            />
          </div>
          <div className={styles.main}>
            <div className={styles.description}>
              <div className={styles.text}>{todo.description}</div>
            </div>
            <div className={styles.info}>
              <span className={styles.chip}>
                カテゴリー: {todo.category?.name}
              </span>
              <span className={styles.chip}>優先: {todo.priority?.name}</span>
              <span className={styles.chip}>重要: {todo.importance?.name}</span>
              <span className={styles.chip}>
                期限:
                {todo.deadline ?? '未設定'}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.edit} onClick={() => onClickEdit(todo)}>
              <EditIcon fontSize="small" />
            </button>
            <button
              className={styles.delete}
              onClick={() => onDeleteEdit(todo)}
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
