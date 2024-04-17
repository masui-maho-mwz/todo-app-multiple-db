import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { updateTodo } from "@/app/operations";
import { CategoryKeys, ImportanceKeys, PriorityKeys, Todo } from "@/app/types";
import { formatISO, parseISO } from "date-fns";
import React, { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const EditTodoModal = ({ todo, onClose }: Props) => {
  const [description, setDescription] = useState<string>(
    todo.description || ""
  );

  const [deadline, setDeadline] = useState<string>(
    todo.deadline
      ? formatISO(parseISO(todo.deadline), { representation: "date" })
      : ""
  );

  const [selectedCategoryName, setSelectedCategoryName] = useState(
    todo.category?.name || ""
  );
  const [selectedPriorityName, setSelectedPriorityName] = useState(
    todo.priority?.name || ""
  );
  const [selectedImportanceName, setSelectedImportanceName] = useState(
    todo.importance?.name || ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 当てはまらない時はエラー処理にする+addと全く同じなので共通化する？
    const categoryKey =
      CategoryKeys.find((cat) => cat.name === selectedCategoryName)?.key ||
      "other";
    const priorityKey =
      PriorityKeys.find((pri) => pri.name === selectedPriorityName)?.key ||
      "low";
    const importanceKey =
      ImportanceKeys.find((imp) => imp.name === selectedImportanceName)?.key ||
      "low";

    updateTodo({
      ...todo,
      description: description,
      categoryKey,
      priorityKey,
      importanceKey,
      deadline: deadline ? formatISO(parseISO(deadline)) : null,
    });
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
        <div className={styles.inputRow}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Todoを入力してください"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputRow}>
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
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
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
