"use client";
import React, { useState } from "react";
import { Category, Importance, Priority } from "../../types";

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
    <form onSubmit={handleSubmit}>
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
        <option value="">カテゴリーを選択</option>
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
        <option value="">優先度を選択</option>
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
        <option value="">重要度を選択</option>
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
      <button type="submit">追加</button>
    </form>
  );
};
