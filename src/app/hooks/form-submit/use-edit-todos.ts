import { updateTodo } from "@/app/operations";
import { Todo, type FormTodoData } from "@/app/types";
import { formatISO, parseISO } from "date-fns";

export const useEditTodo = () => {
  const handleEditTodo = async (
    todo: Todo,
    formData: FormTodoData,
    onSuccess: () => void
  ) => {
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

      const response = await updateTodo(updatedTodo);
      onSuccess();
      return response;
    } catch (error) {
      alert(`ToDoの更新に失敗しました。エラー: ${error}`);
      throw error;
    }
  };

  const createEditTodoHandler =
    (todo: Todo, onClose: () => void) => async (formData: FormTodoData) => {
      await handleEditTodo(todo, formData, onClose);
    };

  return { createEditTodoHandler };
};
