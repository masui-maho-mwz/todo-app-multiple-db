import { Modal } from "@/app/components/modal";
import { Select } from "@/app/components/select";
import { updateTodo } from "@/app/operations";
import { Category, Importance, Priority, Todo } from "@/app/types";
import { CustomTooltip } from "@/app/utils/custom-tooltip";
import { formatISO, parseISO } from "date-fns";
import React, { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  todo: Todo;
  onClose: () => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
};

export const EditTodoModal = ({
  todo,
  onClose,
  onUpdateTodo,
  categories,
  priorities,
  importances,
}: Props) => {
  const [description, setDescription] = useState<string>(
    todo.description || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    todo.categoryId || ""
  );
  const [selectedPriority, setSelectedPriority] = useState<string>(
    todo.priorityId || ""
  );
  const [selectedImportance, setSelectedImportance] = useState<string>(
    todo.importanceId || ""
  );
  const [deadline, setDeadline] = useState<string>(
    todo.deadline
      ? formatISO(parseISO(todo.deadline), { representation: "date" })
      : ""
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTodo: Todo = {
      ...todo,
      description,
      categoryId: selectedCategory,
      priorityId: selectedPriority,
      importanceId: selectedImportance,
      deadline: deadline ? formatISO(parseISO(deadline)) : null,
    };
    try {
      const response = await updateTodo(updatedTodo);
      onUpdateTodo(response);
      onClose();
    } catch (error) {
      alert(`保存処理中にエラーが発生しました: ${error}`);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
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
