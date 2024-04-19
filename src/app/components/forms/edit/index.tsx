import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { useTodos } from "@/app/hooks/use-todos";
import {
  Todo,
  type CategoryKey,
  type ImportanceKey,
  type PriorityKey,
} from "@/app/types";
import { format, formatISO, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  todo: Todo | null;
};

export const EditTodoModal = ({ todo }: Props) => {
  const [show, setShow] = useState(false);
  const { categories, priorities, importances, handleUpdateTodo } = useTodos();

  const [description, setDescription] = useState("");
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<
    CategoryKey | ""
  >(todo ? todo.categoryKey : "");
  const [selectedPriorityKey, setSelectedPriorityKey] = useState<
    PriorityKey | ""
  >(todo ? todo.priorityKey : "");
  const [selectedImportanceKey, setSelectedImportanceKey] = useState<
    ImportanceKey | ""
  >(todo ? todo.importanceKey : "");
  const [deadline, setDeadline] = useState<string | null>(
    todo && todo.deadline ? format(parseISO(todo.deadline), "yyyy-MM-dd") : null
  );

  useEffect(() => {
    if (todo) {
      setShow(true);
      setDescription(todo.description);
      setSelectedCategoryKey(todo.categoryKey);
      setSelectedPriorityKey(todo.priorityKey);
      setSelectedImportanceKey(todo.importanceKey);
      setDeadline(
        todo.deadline ? format(parseISO(todo.deadline), "yyyy-MM-dd") : ""
      );
    } else {
      setShow(false);
    }
  }, [todo]);

  const handleClose = () => {
    setShow(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !todo ||
      !selectedCategoryKey ||
      !selectedPriorityKey ||
      !selectedImportanceKey ||
      !deadline
    ) {
      alert("必要な情報をすべて入力してください。");
      return;
    }

    const updatedTodo = {
      ...todo,
      description,
      categoryKey: selectedCategoryKey,
      priorityKey: selectedPriorityKey,
      importanceKey: selectedImportanceKey,
      deadline: deadline ? formatISO(parseISO(deadline)) : null,
    };
    await handleUpdateTodo(updatedTodo);
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      {show && (
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
                onClick={handleClose}
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
      )}
    </>
  );
};
