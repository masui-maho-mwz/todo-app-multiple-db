import {
  StatusKeyEnum,
  type CategoryKey,
  type FormTodoData,
  type ImportanceKey,
  type PriorityKey
} from "@/app/types";
import { formatISO, parseISO } from "date-fns";
import { useState } from "react";

export const useAddModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | "">(
    ""
  );
  const [selectedPriority, setSelectedPriority] = useState<PriorityKey | "">(
    ""
  );
  const [selectedImportance, setSelectedImportance] = useState<
    ImportanceKey | ""
  >("");
  const [deadline, setDeadline] = useState("");

  const openModal = () => {
    setDescription("");
    setSelectedCategory("");
    setSelectedPriority("");
    setSelectedImportance("");
    setDeadline("");
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (
    e: React.FormEvent,
    onClickAdd: (newTodoData: FormTodoData) => void
  ) => {
    e.preventDefault();
    if (!selectedCategory || !selectedPriority || !selectedImportance) {
      alert("カテゴリ、優先度、重要度を選択してください。");
      return;
    }
    const todoData: FormTodoData = {
      description,
      categoryKey: selectedCategory,
      priorityKey: selectedPriority,
      importanceKey: selectedImportance,
      deadline: deadline ? formatISO(parseISO(deadline)) : "",
      statusKey: StatusKeyEnum.Enum.incomplete
    };

    await onClickAdd(todoData);
    closeModal();
  };

  return {
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
  };
};
