import { NoTodos } from '@/app/components/todo-list/no-todo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format, parseISO } from 'date-fns';
import styles from './styles.module.css';
import { TodoUiModel } from '@/app/ui-models';

type Props = {
  todos: TodoUiModel[];
};

export const TodoList = ({ todos }: Props) => {
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
                {todo.deadline
                  ? format(parseISO(todo.deadline), 'yyyy/MM/dd')
                  : '未設定'}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.edit}>
              <EditIcon fontSize="small" />
            </button>
            <button className={styles.delete}>
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
