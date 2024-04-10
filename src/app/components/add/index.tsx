"use client";
import React, { useState } from "react";
import { Category, Importance, Priority } from "../../types";
import styles from "./styles.module.css";

type Props = {
  handleAddTodo: (todo: any) => void;
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
};

export const AddTodo: React.FC<Props> = ({
  handleAddTodo,
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
    handleAddTodo(todo);
    setDescription("");
    setSelectedCategory("");
    setSelectedPriority("");
    setSelectedImportance("");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h4>Todoの追加</h4>
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
      >
        <option value="">重要度</option>
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
      <button className={styles.addButton} type="submit">
        追加
      </button>
    </form>
  );
};
