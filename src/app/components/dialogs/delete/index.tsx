import { Modal } from "@/app/components/surfaces/modal";
import { useTodos } from "@/app/hooks/use-todos";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  todoId: string | null;
};

export const DeleteTodoDialog = ({ todoId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleDeleteTodo } = useTodos();

  useEffect(() => {
    if (todoId) setIsOpen(true);
    else setIsOpen(false);
  }, [todoId]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    if (todoId) {
      await handleDeleteTodo(todoId);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <div>
        <p>本当に削除してよろしいですか？</p>
        <div className={styles.dialogButton}>
          <button onClick={handleClose} className={styles.cancelButton}>
            キャンセル
          </button>
          <button onClick={handleConfirm} className={styles.deleteButton}>
            削除
          </button>
        </div>
      </div>
    </Modal>
  );
};
