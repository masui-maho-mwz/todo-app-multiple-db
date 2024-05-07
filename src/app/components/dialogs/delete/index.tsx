import { Modal } from "@/app/components/surfaces/modal";
import { useModal } from "@/app/hooks/use-modal-hooks";
import { useEffect } from "react";
import styles from "./styles.module.css";

type Props = {
  onClickDelete: (todoId: string) => void;
  todoId: string | null;
};

export const DeleteTodoDialog = ({ onClickDelete, todoId }: Props) => {
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (todoId) {
      openModal();
    } else {
      closeModal();
    }
  }, [todoId]);

  const handleConfirm = async () => {
    if (todoId) {
      await onClickDelete(todoId);
      closeModal();
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div>
        <p>本当に削除してよろしいですか？</p>
        <div className={styles.actions}>
          <button onClick={closeModal} className={styles.cancel}>
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
