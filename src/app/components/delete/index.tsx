import styles from "./styles.module.css";

type Props = {
  todoId: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteTodoDialog = ({ todoId, onClose, onConfirm }: Props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog}>
        <p>本当に削除してよろしいですか？</p>
        <div className={styles.dialogButton}>
          <button onClick={onClose} className={styles.cancelButton}>
            キャンセル
          </button>
          <button onClick={onConfirm} className={styles.deleteButton}>
            削除
          </button>
        </div>
      </div>
    </div>
  );
};
