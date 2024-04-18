import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { useEditTodo } from "@/app/hooks/form-submit/use-edit-todos";
import { useTodos } from "@/app/hooks/use-todos";
import {
  Todo,
  type CategoryKey,
  type FormTodoData,
  type ImportanceKey,
  type PriorityKey,
} from "@/app/types";
import { formatISO, parseISO } from "date-fns";
import React, { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const EditTodoModal = ({ todo, onClose }: Props) => {
  const { categories, priorities, importances } = useTodos();
  const { createEditTodoHandler } = useEditTodo();
  const handleEdit = createEditTodoHandler(todo, onClose);

  const [description, setDescription] = useState<string>(todo.description);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<
    CategoryKey | ""
  >(todo.categoryKey);
  const [selectedPriorityKey, setSelectedPriorityKey] = useState<
    PriorityKey | ""
  >(todo.priorityKey);
  const [selectedImportanceKey, setSelectedImportanceKey] = useState<
    ImportanceKey | ""
  >(todo.importanceKey);
  const [deadline, setDeadline] = useState<string | null>(
    todo.deadline
      ? formatISO(parseISO(todo.deadline), { representation: "date" })
      : null
  );

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 仕様は後で決める。一旦ロジックのみ作る
    if (
      !selectedCategoryKey ||
      !selectedPriorityKey ||
      !selectedImportanceKey
    ) {
      alert("カテゴリ、優先度、重要度を選択してください。");
      return;
    }
    if (!deadline) return;
    if (!todo.statusKey) return;

    const formData: FormTodoData = {
      ...todo,
      description: description,
      categoryKey: selectedCategoryKey,
      priorityKey: selectedPriorityKey,
      importanceKey: selectedImportanceKey,
      deadline: formatISO(parseISO(deadline)),
      statusKey: todo.statusKey,
    };
    handleEdit(formData);
  };

  return (
    <Modal>
      <form
        onSubmit={handleEditSubmit}
        className={styles.formContainer}
        noValidate
      >
        <div className={styles.inputRow}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Todoを入力してください"
            className={styles.input}
          />
        </div>
        <div className={styles.inputRow}>
          <Select
            options={categories.map((category) => ({
              key: category.key,
              name: category.name,
            }))}
            value={selectedCategoryKey}
            onChange={setSelectedCategoryKey}
            placeholder="カテゴリー"
          />
          <Select
            options={priorities.map((priority) => ({
              key: priority.key,
              name: priority.name,
            }))}
            value={selectedPriorityKey}
            onChange={setSelectedPriorityKey}
            placeholder="優先度"
          />
          <Select
            options={importances.map((importance) => ({
              key: importance.key,
              name: importance.name,
            }))}
            value={selectedImportanceKey}
            onChange={setSelectedImportanceKey}
            placeholder="重要度"
          />

          <CustomTooltip text="期限を選択してください">
            <input
              type="date"
              value={deadline ? deadline : ""}
              onChange={(e) => setDeadline(e.target.value)}
              className={styles.input}
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
          <button type="submit" className={styles.editButton}>
            保存
          </button>
        </div>
      </form>
    </Modal>
  );
};
