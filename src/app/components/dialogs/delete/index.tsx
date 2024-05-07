import { Modal } from "@/app/components/surfaces/modal";
import styles from "./styles.module.css";

type Props = {
  isOpen: boolean;
  onClickDelete: (todoId: string) => void;
  onClose: () => void;
  todoId: string | null;
};

export const DeleteTodoDialog = ({
  isOpen,
  onClickDelete,
  onClose,
  todoId
}: Props) => {
  const handleConfirm = async () => {
    if (todoId) {
      await onClickDelete(todoId);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div>
        <p>本当に削除してよろしいですか？</p>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancel}>
            キャンセル
          </button>
          <button onClick={handleConfirm} className={styles.delete}>
            削除
          </button>
        </div>
      </div>
    </Modal>
  );
};
