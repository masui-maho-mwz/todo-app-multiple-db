"use client";
import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { Category, Importance, Priority, Todo } from "@/app/types";
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
    <Modal>
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
          <Select
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="カテゴリー"
          />
          <Select
            options={priorities}
            value={selectedPriority}
            onChange={setSelectedPriority}
            placeholder="優先度"
          />
          <Select
            options={importances}
            value={selectedImportance}
            onChange={setSelectedImportance}
            placeholder="重要度"
          />
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
    </Modal>
  );
};
