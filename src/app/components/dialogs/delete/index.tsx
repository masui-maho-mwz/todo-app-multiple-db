import { Modal } from "@/app/components/surfaces/modal";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  onClickDelete: (todoId: string) => void;
  todoId: string | null;
};

export const DeleteTodoDialog = ({ onClickDelete, todoId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (todoId) setIsOpen(true);
    else setIsOpen(false);
  }, [todoId]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    if (todoId) {
      await onClickDelete(todoId);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <div>
        <p>本当に削除してよろしいですか？</p>
        <div className={styles.actions}>
          <button onClick={handleClose} className={styles.cancel}>
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
