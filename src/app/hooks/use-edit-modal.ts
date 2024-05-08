import type {
  CategoryKey,
  ImportanceKey,
  PriorityKey,
  Todo
} from "@/app/types";
import { format, formatISO, parseISO } from "date-fns";
import { useState } from "react";

export const useEditModal = (onClose: () => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [description, setDescription] = useState("");
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<
    CategoryKey | ""
  >("");
  const [selectedPriorityKey, setSelectedPriorityKey] = useState<
    PriorityKey | ""
  >("");
  const [selectedImportanceKey, setSelectedImportanceKey] = useState<
    ImportanceKey | ""
  >("");
  const [deadline, setDeadline] = useState<string | null>(null);

  const openModal = (todoToEdit: Todo | null) => {
    if (todoToEdit) {
      setTodo(todoToEdit);
      setDescription(todoToEdit.description);
      setSelectedCategoryKey(todoToEdit.categoryKey);
      setSelectedPriorityKey(todoToEdit.priorityKey);
      setSelectedImportanceKey(todoToEdit.importanceKey);
      setDeadline(
        todoToEdit.deadline
          ? format(parseISO(todoToEdit.deadline), "yyyy-MM-dd")
          : null
      );
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setTodo(null);
    setDescription("");
    setSelectedCategoryKey("");
    setSelectedPriorityKey("");
    setSelectedImportanceKey("");
    setDeadline(null);
    setIsOpen(false);
    onClose();
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    onClickUpdate: (updatedTodo: Todo) => void
  ) => {
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
    closeModal();
  };

  return {
    isOpen,
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
    handleSubmit
  };
};
