"use client";
import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { useTodos } from "@/app/hooks/use-todos";
import {
  CategoryKeyEnum,
  ImportanceKeyEnum,
  PriorityKeyEnum,
  StatusKeyEnum,
  Todo,
} from "@/app/types";
import { formatISO, parseISO } from "date-fns";
import React, { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  onClose: () => void;
};

export const AddTodoModal = ({ onClose }: Props) => {
  const { categories, priorities, importances, createAddTodoHandler } =
    useTodos();
  const handleAdd = createAddTodoHandler(onClose);
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedImportance, setSelectedImportance] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todoData: Omit<Todo, "id" | "createdAt"> = {
      description,
      categoryKey: selectedCategory as typeof CategoryKeyEnum._type,
      priorityKey: selectedPriority as typeof PriorityKeyEnum._type,
      importanceKey: selectedImportance as typeof ImportanceKeyEnum._type,
      deadline: deadline ? formatISO(parseISO(deadline)) : null,
      statusKey: "incomplete" as typeof StatusKeyEnum._type,
    };
    handleAdd(todoData);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todoを入力してください"
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
