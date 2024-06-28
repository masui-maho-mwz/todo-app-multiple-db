import { Select } from '@/components/forms/select';
import { CustomTooltip } from '@/components/elements/tooltip';
import { Modal } from '@/components/surfaces/modal';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { TodoViewModel } from '@/core/types';
import {
  CategoryUiModel,
  ImportanceUiModel,
  PriorityUiModel,
} from '@/features/dashboard/ui-models';

type Props = {
  todo: TodoViewModel | null;
  categories: CategoryUiModel[];
  priorities: PriorityUiModel[];
  importances: ImportanceUiModel[];
  isOpen: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

export const EditTodoModal = ({
  todo,
  categories,
  priorities,
  importances,
  isOpen,
  onSubmit,
  onClose,
}: Props) => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedImportance, setSelectedImportance] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (!todo) return;

    setDescription(todo.description);
    setSelectedCategory(todo.category.key);
    setSelectedPriority(todo.priority.key);
    setSelectedImportance(todo.importance.key);
    setDeadline(todo.deadline || '');
  }, [todo]);

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={onSubmit} className={styles.root} noValidate>
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
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="カテゴリー"
          />
          <Select
            options={priorities.map((priority) => ({
              key: priority.key,
              name: priority.name,
            }))}
            value={selectedPriority}
            onChange={setSelectedPriority}
            placeholder="優先度"
          />
          <Select
            options={importances.map((importance) => ({
              key: importance.key,
              name: importance.name,
            }))}
            value={selectedImportance}
            onChange={setSelectedImportance}
            placeholder="重要度"
          />
          <CustomTooltip text="期限を選択してください">
            {/* TODO: コンポーネント化する！ */}
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={styles.text}
            />
          </CustomTooltip>
        </div>
        <div className={styles.actions}>
          {/* TODO: button コンポーネント化する！ */}
          <button type="button" onClick={onClose} className={styles.cancel}>
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
