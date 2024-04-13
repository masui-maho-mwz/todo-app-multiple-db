import { updateTodo } from "@/app/operations";
import { Category, Importance, Priority, Todo } from "@/app/types";
import React, { FC, useState } from "react";
import styles from "./styles.module.css";

interface Props {
  todo: Todo;
  onClose: () => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
}

const EditTodoModal: FC<Props> = ({
  todo,
  onClose,
  onUpdateTodo,
  categories,
  priorities,
  importances,
}) => {
  const [description, setDescription] = useState<string>(
    todo.description || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    todo.categoryId || ""
  );
  const [selectedPriority, setSelectedPriority] = useState<string>(
    todo.priorityId || ""
  );
  const [selectedImportance, setSelectedImportance] = useState<string>(
    todo.importanceId || ""
  );
  const [deadline, setDeadline] = useState<string>(
    todo.deadline ? new Date(todo.deadline).toISOString().slice(0, 10) : ""
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const deadlineDate = deadline ? new Date(deadline).toISOString() : null;
      const updatedTodo: Todo = {
        ...todo,
        description,
        categoryId: selectedCategory,
        priorityId: selectedPriority,
        importanceId: selectedImportance,
        deadline: deadlineDate,
      };
      const response = await updateTodo(updatedTodo);
      onUpdateTodo(response);
      onClose();
    } catch (error) {
      alert(`保存処理中にエラーが発生しました: ${error}`);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeIcon} onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h4>編集</h4>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="ToDoを入力してください"
            required
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            required
          >
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
          <select
            value={selectedImportance}
            onChange={(e) => setSelectedImportance(e.target.value)}
            required
          >
            {importances.map((importance) => (
              <option key={importance.id} value={importance.id}>
                {importance.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <button type="submit" className={styles.editButton}>
            保存
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
