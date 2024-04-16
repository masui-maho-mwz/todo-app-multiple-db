import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { useTodos } from "@/app/hooks/use-todos";
import { updateTodo } from "@/app/operations";
import {
  Todo,
  type CategoryKeyEnum,
  type ImportanceKeyEnum,
  type PriorityKeyEnum,
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
  const [description, setDescription] = useState<string>(
    todo.description || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    todo.category?.name || ""
  );
  const [selectedPriority, setSelectedPriority] = useState<string>(
    todo.priority?.name || ""
  );
  const [selectedImportance, setSelectedImportance] = useState<string>(
    todo.importance?.name || ""
  );
  const [deadline, setDeadline] = useState<string>(
    todo.deadline
      ? formatISO(parseISO(todo.deadline), { representation: "date" })
      : ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo({
      ...todo,
      description: description,
      categoryKey: selectedCategory as typeof CategoryKeyEnum._type,
      priorityKey: selectedPriority as typeof PriorityKeyEnum._type,
      importanceKey: selectedImportance as typeof ImportanceKeyEnum._type,
      deadline: deadline ? formatISO(parseISO(deadline)) : null,
    });
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
