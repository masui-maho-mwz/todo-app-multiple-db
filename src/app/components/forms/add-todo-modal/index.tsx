'use client';
import { Select } from '@/app/components/forms/select';
import { CustomTooltip } from '@/app/components/forms/tooltip';
import { Modal } from '@/app/components/surfaces/modal';
import styles from './styles.module.css';
import { z } from 'zod';
import { useState } from 'react';

const todoSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .min(1, 'Todoは入力必須です。')
    .max(140, '説明は140字以内である必要があります'),
  categoryKey: z.string(),
  priorityKey: z.string(),
  importanceKey: z.string(),
  statusKey: z.string(),
  deadline: z.string().nullable(),
});

type FormData = z.infer<typeof todoSchema>;

type Category = { key: string; name: string };
type Priority = { key: string; name: string };
type Importance = { key: string; name: string };

type Props = {
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
  isOpen: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClickCloseModal: () => void;
};

export const AddTodoModal = ({
  categories,
  priorities,
  importances,
  isOpen,
  onSubmit,
  onClickCloseModal,
}: Props) => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedImportance, setSelectedImportance] = useState('');
  const [deadline, setDeadline] = useState('');

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={onSubmit} className={styles.form} noValidate>
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
            onClick={onClickCloseModal}
          >
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
