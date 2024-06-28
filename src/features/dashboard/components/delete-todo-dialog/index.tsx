import { Modal } from '@/components/surfaces/modal';
import styles from './styles.module.css';
import { TodoViewModel } from '@/core/types';

type Props = {
  todo: TodoViewModel | null;
  isOpen: boolean;
  onDelete: (todoId: string) => void;
  onClose: () => void;
};

export const DeleteTodoDialog = ({
  todo,
  isOpen,
  onDelete,
  onClose,
}: Props) => {
  const handleConfirm = async () => {
    if (todo) {
      await onDelete(todo.id);
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
