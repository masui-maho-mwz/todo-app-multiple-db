import { Modal } from "@/app/components/modal";
import styles from "./styles.module.css";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteTodoDialog = ({ onClose, onConfirm }: Props) => {
  return (
    <Modal>
      <div>
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
    </Modal>
  );
};
