import { Todo } from "@/app/types";
import { FC } from "react";
import styles from "./styles.module.css";

interface EditTodoModalProps {
  todo: Todo;
  onClose: () => void;
}

export const EditTodoModal: FC<EditTodoModalProps> = ({ todo, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Todo を編集する</h2>
        <p>{todo.description}</p>
        {/* TODO: 編集フォームをここに追加する */}
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};
