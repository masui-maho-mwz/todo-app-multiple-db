'use client';
import { Select } from '@/components/forms/select';
import { CustomTooltip } from '@/components/elements/tooltip';
import { Modal } from '@/components/surfaces/modal';
import styles from './styles.module.css';
import { z } from 'zod';
import { ReactEventHandler, useState } from 'react';
import {
  CategoryUiModel,
  ImportanceUiModel,
  PriorityUiModel,
} from '@/features/dashboard/ui-models';

const todoSchema = z.object({
  description: z
    .string()
    .min(1, 'Todoは入力必須です。')
    .max(140, '説明は140字以内である必要があります'),
  deadline: z.string().optional(),
  categoryKey: z.string().optional(),
  priorityKey: z.string().optional(),
  importanceKey: z.string().optional(),
});

export type FormData = z.infer<typeof todoSchema>;

type Props = {
  categories: CategoryUiModel[];
  priorities: PriorityUiModel[];
  importances: ImportanceUiModel[];
  isOpen: boolean;
  onSubmit: (data: FormData) => void;
  onClose: () => void;
};

export const AddTodoModal = ({
  categories,
  priorities,
  importances,
  isOpen,
  onSubmit,
  onClose,
}: Props) => {
  const [description, setDescription] = useState('');
  const [categoryKey, setCategoryKey] = useState('');
  const [priorityKey, setPriorityKey] = useState('');
  const [importanceKey, setImportanceKey] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit: ReactEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    onSubmit({
      description,
      categoryKey,
      priorityKey,
      importanceKey,
      deadline,
    });
  };

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
              name: category.name,
            }))}
            value={categoryKey}
            onChange={setCategoryKey}
            placeholder="カテゴリー"
          />
          <Select
            options={priorities.map((priority) => ({
              key: priority.key,
              name: priority.name,
            }))}
            value={priorityKey}
            onChange={setPriorityKey}
            placeholder="優先度"
          />
          <Select
            options={importances.map((importance) => ({
              key: importance.key,
              name: importance.name,
            }))}
            value={importanceKey}
            onChange={setImportanceKey}
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
          <button type="button" className={styles.cancel} onClick={onClose}>
            キャンセル
          </button>
          <button className={styles.add} type="submit">
            追加
          </button>
        </div>
      </form>
    </Modal>
  );
};
