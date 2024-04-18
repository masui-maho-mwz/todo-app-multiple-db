import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { updateTodo } from "@/app/operations";
import { Todo } from "@/app/types";
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

  const [selectedCategoryKey, setSelectedCategoryKey] = useState(
    todo.category?.name || ""
  );
  const [selectedPriorityKey, setSelectedPriorityKey] = useState(
    todo.priority?.name || ""
  );
  const [selectedImportanceKey, setSelectedImportanceKey] = useState(
    todo.importance?.name || ""
  );
  const [deadline, setDeadline] = useState<string>(
    todo.deadline
      ? formatISO(parseISO(todo.deadline), { representation: "date" })
      : ""
  );

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo({
      ...todo,
      description: description,
      category: selectedCategoryKey,
      priorityKey: selectedPriorityKey,
      importanceKey: selectedImportanceKey,
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
          {/* <Select
            options={CategoryKeys.map((cat) => ({
              key: cat.key,
              name: cat.name,
            }))}
            value={selectedCategoryKey}
            onChange={setSelectedCategoryKey}
            placeholder="カテゴリー"
          />
          <Select
            options={PriorityKeys.map((pri) => ({
              key: pri.key,
              name: pri.name,
            }))}
            value={selectedPriorityKey}
            onChange={setSelectedPriorityKey}
            placeholder="優先度"
          />
          <Select
            options={ImportanceKeys.map((imp) => ({
              key: imp.key,
              name: imp.name,
            }))}
            value={selectedImportanceKey}
            onChange={setSelectedImportanceKey}
            placeholder="重要度"
          /> */}
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
