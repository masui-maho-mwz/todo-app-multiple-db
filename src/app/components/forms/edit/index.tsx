import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import type {
  Category,
  CategoryKey,
  Importance,
  ImportanceKey,
  Priority,
  PriorityKey,
  Todo
} from "@/app/types";
import { format, formatISO, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
  todo: Todo | null;
  onClickUpdate: (updatedTodo: Todo) => void;
};

export const EditTodoModal = ({
  categories,
  priorities,
  importances,
  todo,
  onClickUpdate
}: Props) => {
  const [show, setShow] = useState(false);

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
      deadline: deadline ? formatISO(parseISO(deadline)) : null
    };
    await onClickUpdate(updatedTodo);
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      {show && (
        <Modal>
          <form onSubmit={handleEditSubmit} className={styles.root} noValidate>
            <div className={styles.inputs}>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Todoを入力してください"
                className={styles.text}
              />
            </div>
            <div className={styles.inputs}>
              <Select
                options={categories.map((category) => ({
                  key: category.key,
                  name: category.name
                }))}
                value={selectedCategoryKey}
                onChange={setSelectedCategoryKey}
                placeholder="カテゴリー"
              />
              <Select
                options={priorities.map((priority) => ({
                  key: priority.key,
                  name: priority.name
                }))}
                value={selectedPriorityKey}
                onChange={setSelectedPriorityKey}
                placeholder="優先度"
              />
              <Select
                options={importances.map((importance) => ({
                  key: importance.key,
                  name: importance.name
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
                  className={styles.text}
                />
              </CustomTooltip>
            </div>
            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleClose}
                className={styles.cancel}
              >
                キャンセル
              </button>
              <button type="submit" className={styles.edit}>
                保存
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
