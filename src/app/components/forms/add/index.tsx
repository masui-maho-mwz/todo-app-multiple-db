"use client";
import { Select } from "@/app/components/forms/select";
import { CustomTooltip } from "@/app/components/forms/tooltip";
import { Modal } from "@/app/components/surfaces/modal";
import { useAddModal } from "@/app/hooks/use-add-modal";
import {
  type Category,
  type FormTodoData,
  type Importance,
  type Priority
} from "@/app/types";
import AddIcon from "@mui/icons-material/Add";
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
  const {
    isOpen,
    openModal,
    closeModal,
    description,
    setDescription,
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    setSelectedPriority,
    selectedImportance,
    setSelectedImportance,
    deadline,
    setDeadline,
    handleSubmit
  } = useAddModal();

  return (
    <div>
      <div className={styles.sidebar} onClick={openModal}>
        <AddIcon className={styles.icon} />
        <span className={styles.label}>タスクを追加</span>
      </div>
      <Modal isOpen={isOpen}>
        <form
          onSubmit={(e) => handleSubmit(e, onClickAdd)}
          className={styles.form}
          noValidate
        >
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
              onClick={closeModal}
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
