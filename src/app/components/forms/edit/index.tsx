import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { useTodos } from "@/app/hooks/use-todos";
import { updateTodo } from "@/app/operations";
import {
  Todo,
  type CategoryKey,
  type FormTodoData,
  type ImportanceKey,
  type PriorityKey,
} from "@/app/types";
import { formatISO, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  todo: Todo | null;
  onClose: () => void;
};

export const EditTodoModal = ({ todo, onClose }: Props) => {
  const [show, setShow] = useState(false);
  const { categories, priorities, importances } = useTodos();

  useEffect(() => {
    setShow(!!todo);
    if (todo) {
      setDescription(todo.description);
      setSelectedCategoryKey(todo.categoryKey);
      setSelectedPriorityKey(todo.priorityKey);
      setSelectedImportanceKey(todo.importanceKey);
      setDeadline(
        todo.deadline
          ? formatISO(parseISO(todo.deadline), { representation: "date" })
          : null
      );
    }
  }, [todo]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const [description, setDescription] = useState<string>(
    todo ? todo.description : ""
  );
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
    todo && todo.deadline
      ? formatISO(parseISO(todo.deadline), { representation: "date" })
      : null
  );

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

    const formData: FormTodoData = {
      ...todo,
      description,
      categoryKey: selectedCategoryKey,
      priorityKey: selectedPriorityKey,
      importanceKey: selectedImportanceKey,
      deadline: formatISO(parseISO(deadline)),
      statusKey: todo.statusKey,
    };
    try {
      const updatedTodo: Todo = {
        ...todo,
        description: formData.description,
        categoryKey: formData.categoryKey,
        priorityKey: formData.priorityKey,
        importanceKey: formData.importanceKey,
        deadline: formData.deadline
          ? formatISO(parseISO(formData.deadline))
          : null,
      };
      await updateTodo(updatedTodo);
      onClose();
    } catch (error) {
      alert(`ToDoの更新に失敗しました。エラー: ${error}`);
    }
  };

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
