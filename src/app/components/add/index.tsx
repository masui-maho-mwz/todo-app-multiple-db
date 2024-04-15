"use client";
import { Category, Importance, Priority, Todo } from "@/app/types";
import { CustomTooltip } from "@/app/utils/custom-tooltip";
import { formatISO, parseISO } from "date-fns";
import React, { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  onClose: () => void;
  onAddTodo: (todo: Omit<Todo, "id" | "createdAt">) => void;
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
};

export const AddTodoModal = ({
  onClose,
  onAddTodo,
  categories,
  priorities,
  importances,
}: Props) => {
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedImportance, setSelectedImportance] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todo: Omit<Todo, "id" | "createdAt"> = {
      description,
      categoryId: selectedCategory,
      priorityId: selectedPriority,
      importanceId: selectedImportance,
      deadline: deadline ? formatISO(parseISO(deadline)) : null,
      status: {
        key: "incomplete",
        name: "未完了",
        id: "cluruuvds000cxhqzcyrbabnm",
      },
    };
    onAddTodo(todo);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setDescription("");
    setSelectedCategory("");
    setSelectedPriority("");
    setSelectedImportance("");
    setDeadline("");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Todoを入力してください"
            required
            className={styles.inputText}
          />
          <div className={styles.inputContainer}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className={styles.select}
            >
              <option value="">カテゴリー</option>
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
              className={styles.select}
            >
              <option value="">優先度</option>
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
              className={styles.select}
            >
              <option value="">重要度</option>
              {importances.map((importance) => (
                <option key={importance.id} value={importance.id}>
                  {importance.name}
                </option>
              ))}
            </select>
            <CustomTooltip text="期限を選択してください">
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className={styles.inputDeadline}
              />
            </CustomTooltip>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              キャンセル
            </button>
            <button className={styles.submitButton} type="submit">
              追加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
