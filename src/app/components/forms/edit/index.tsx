import { Select } from '@/app/components/forms/select';
import { CustomTooltip } from '@/app/components/forms/tooltip';
import { Modal } from '@/app/components/surfaces/modal';
import { useEditModal } from '@/app/hooks/use-edit-modal';
import type { Category, Importance, Priority, Todo } from '@/app/ui-models';
import { useEffect } from 'react';
import styles from './styles.module.css';

type Props = {
  isOpen: boolean;
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
  todo: Todo | null;
  onClickUpdate: (updatedTodo: Todo) => void;
  onClose: () => void;
};

export const EditTodoModal = ({
  isOpen,
  categories,
  priorities,
  importances,
  todo,
  onClickUpdate,
  onClose,
}: Props) => {
  const {
    openModal,
    closeModal,
    description,
    setDescription,
    selectedCategoryKey,
    setSelectedCategoryKey,
    selectedPriorityKey,
    setSelectedPriorityKey,
    selectedImportanceKey,
    setSelectedImportanceKey,
    deadline,
    setDeadline,
    handleSubmit,
  } = useEditModal(onClose);

  useEffect(() => {
    if (isOpen) {
      openModal(todo);
    }
  }, [isOpen, todo]);

  return (
    <Modal isOpen={isOpen}>
      <form
        onSubmit={(e) => handleSubmit(e, onClickUpdate)}
        className={styles.root}
        noValidate
      >
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
              value={deadline ? deadline : ''}
              onChange={(e) => setDeadline(e.target.value)}
              className={styles.text}
            />
          </CustomTooltip>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={closeModal} className={styles.cancel}>
            キャンセル
          </button>
          <button type="submit" className={styles.edit}>
            保存
          </button>
        </div>
      </form>
    </Modal>
  );
};
