"use client";
import {
  Todo,
  type Category,
  type Importance,
  type Priority,
} from "@/app/types";
import { FC, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  todo: Todo;
  onClose: () => void;
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
};

export const EditTodoModal: FC<Props> = ({
  todo,
  onClose,
  categories,
  priorities,
  importances,
}) => {
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedImportance, setSelectedImportance] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todo = {
      description,
      categoryId: selectedCategory,
      priorityId: selectedPriority,
      importanceId: selectedImportance,
      deadline,
    };
    // TODO: update関数にする
    // handleAddTodo(todo);
    setDescription("");
    setSelectedCategory("");
    setSelectedPriority("");
    setSelectedImportance("");
    setDeadline("");
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeIcon} onClick={onClose}>
          &times;
        </button>
        <form className={styles.formContainer}>
          <h4>編集</h4>
          <input
            type="text"
            value={todo.description}
            placeholder="ToDoを入力してください"
            required
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">{todo.category?.name}</option>
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
            <option value="">{todo.priority?.name}</option>
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
            <option value="">{todo.importance?.name}</option>
            {importances.map((importance) => (
              <option key={importance.id} value={importance.id}>
                {importance.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            // TODO: 日付の表示の仕方調査する。
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <button className={styles.editButton} onClick={onClose}>
            保存
          </button>
        </form>
      </div>
    </div>
  );
};
