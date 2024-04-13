import { updateTodo } from "@/app/operations";
import { Category, Importance, Priority, Todo } from "@/app/types";
import { formatISO, parseISO } from "date-fns";
import React, { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  todo: Todo;
  onClose: () => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
};

const EditTodoModal: React.FC<Props> = ({
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
    todo.deadline
      ? formatISO(parseISO(todo.deadline), { representation: "date" })
      : ""
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTodo: Todo = {
      ...todo,
      description,
      categoryId: selectedCategory,
      priorityId: selectedPriority,
      importanceId: selectedImportance,
      deadline: deadline ? formatISO(parseISO(deadline)) : null,
    };
    try {
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
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputRow}>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Todoを入力してください"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputRow}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              キャンセル
            </button>
            <button type="submit" className={styles.editButton}>
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
