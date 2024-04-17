"use client";
import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { useTodos } from "@/app/hooks/use-todos";
import { CategoryKeys, ImportanceKeys, PriorityKeys, Todo } from "@/app/types";
import { formatISO, parseISO } from "date-fns";
import React, { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  onClose: () => void;
};

export const AddTodoModal = ({ onClose }: Props) => {
  const { createAddTodoHandler } = useTodos();
  const handleAdd = createAddTodoHandler(onClose);
  const [description, setDescription] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedPriorityName, setSelectedPriorityName] = useState("");
  const [selectedImportanceName, setSelectedImportanceName] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 当てはまらない時はエラー処理にする+editと全く同じなので共通化する？
    const categoryKey =
      CategoryKeys.find((cat) => cat.name === selectedCategoryName)?.key ||
      "other";
    const priorityKey =
      PriorityKeys.find((pri) => pri.name === selectedPriorityName)?.key ||
      "low";
    const importanceKey =
      ImportanceKeys.find((imp) => imp.name === selectedImportanceName)?.key ||
      "low";

    const todoData: Omit<Todo, "id" | "createdAt"> = {
      description,
      categoryKey,
      priorityKey,
      importanceKey,
      deadline: deadline ? formatISO(parseISO(deadline)) : null,
      statusKey: "incomplete",
    };

    handleAdd(todoData);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todoを入力してください"
          className={styles.inputText}
        />
        <div className={styles.inputContainer}>
          <Select
            options={CategoryKeys.map((cat) => ({ name: cat.name }))}
            value={selectedCategoryName}
            onChange={setSelectedCategoryName}
            placeholder="カテゴリー"
          />
          <Select
            options={PriorityKeys.map((pri) => ({ name: pri.name }))}
            value={selectedPriorityName}
            onChange={setSelectedPriorityName}
            placeholder="優先度"
          />
          <Select
            options={ImportanceKeys.map((imp) => ({ name: imp.name }))}
            value={selectedImportanceName}
            onChange={setSelectedImportanceName}
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
          <button type="submit" className={styles.submitButton}>
            追加
          </button>
        </div>
      </form>
    </Modal>
  );
};
