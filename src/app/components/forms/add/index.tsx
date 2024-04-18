"use client";
import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { addTodoHandler } from "@/app/hooks/form-submit/use-add-todos";
import { useTodos } from "@/app/hooks/use-todos";
import {
  StatusKeyEnum,
  type CategoryKey,
  type FormTodoData,
  type ImportanceKey,
  type PriorityKey,
} from "@/app/types";
import AddIcon from "@mui/icons-material/Add";
import { formatISO, parseISO } from "date-fns";
import React, { useState } from "react";
import styles from "./styles.module.css";

export const AddTodoModal = () => {
  const [show, setShow] = useState(false);
  const { categories, priorities, importances } = useTodos();

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 仕様は後で決める。一旦ロジックのみ作る
    if (!selectedCategory || !selectedPriority || !selectedImportance) {
      alert("カテゴリ、優先度、重要度を選択してください。");
      return;
    }
    const todoData: FormTodoData = {
      description,
      categoryKey: selectedCategory,
      priorityKey: selectedPriority,
      importanceKey: selectedImportance,
      deadline: formatISO(parseISO(deadline)),
      statusKey: StatusKeyEnum.Enum.incomplete,
    };
    addTodoHandler(todoData).then(closeModal);
  };

  return (
    <div>
      <div className={styles.sidebarItem} onClick={openModal}>
        <AddIcon className={styles.icon} />
        <span className={styles.label}>タスクを追加</span>
      </div>
      {show && (
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
                options={categories.map((category) => ({
                  key: category.key,
                  name: category.name,
                }))}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="カテゴリー"
              />
              <Select
                options={priorities.map((priority) => ({
                  key: priority.key,
                  name: priority.name,
                }))}
                value={selectedPriority}
                onChange={setSelectedPriority}
                placeholder="優先度"
              />
              <Select
                options={importances.map((importance) => ({
                  key: importance.key,
                  name: importance.name,
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
                  className={styles.inputDeadline}
                />
              </CustomTooltip>
            </div>
            <div className={styles.buttonContainer}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={closeModal}
              >
                キャンセル
              </button>
              <button className={styles.submitButton} type="submit">
                追加
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
