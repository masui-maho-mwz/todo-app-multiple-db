"use client";
import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import {
  StatusKeyEnum,
  type Category,
  type CategoryKey,
  type FormTodoData,
  type Importance,
  type ImportanceKey,
  type Priority,
  type PriorityKey
} from "@/app/types";
import AddIcon from "@mui/icons-material/Add";
import { formatISO, parseISO } from "date-fns";
import React, { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
  onClickAdd: (newTodoData: FormTodoData) => void;
};

export const AddTodoModal = ({
  categories,
  priorities,
  importances,
  onClickAdd
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setDescription("");
    setSelectedCategory("");
    setSelectedPriority("");
    setSelectedImportance("");
    setDeadline("");
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | "">(
    ""
  );
  const [selectedPriority, setSelectedPriority] = useState<PriorityKey | "">(
    ""
  );
  const [selectedImportance, setSelectedImportance] = useState<
    ImportanceKey | ""
  >("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedPriority || !selectedImportance) {
      alert("カテゴリ、優先度、重要度を選択してください。");
      return;
    }
    const todoData: FormTodoData = {
      description,
      categoryKey: selectedCategory,
      priorityKey: selectedPriority,
      importanceKey: selectedImportance,
      deadline: deadline ? formatISO(parseISO(deadline)) : "",
      statusKey: StatusKeyEnum.Enum.incomplete
    };

    await onClickAdd(todoData);
    setIsOpen(false);
  };

  return (
    <div>
      <div className={styles.sidebar} onClick={openModal}>
        <AddIcon className={styles.icon} />
        <span className={styles.label}>タスクを追加</span>
      </div>
      <Modal isOpen={isOpen}>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Todoを入力してください"
            className={styles.text}
          />
          <div className={styles.items}>
            <Select
              options={categories.map((category) => ({
                key: category.key,
                name: category.name
              }))}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="カテゴリー"
            />
            <Select
              options={priorities.map((priority) => ({
                key: priority.key,
                name: priority.name
              }))}
              value={selectedPriority}
              onChange={setSelectedPriority}
              placeholder="優先度"
            />
            <Select
              options={importances.map((importance) => ({
                key: importance.key,
                name: importance.name
              }))}
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
                className={styles.date}
              />
            </CustomTooltip>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={handleClose}
            >
              キャンセル
            </button>
            <button className={styles.add} type="submit">
              追加
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
