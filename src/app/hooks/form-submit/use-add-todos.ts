import { addTodo } from "@/app/operations";
import { type FormTodoData } from "@/app/types";

export const useAddTodo = () => {
  const handleAddTodo = async (
    todoData: FormTodoData,
    onSuccess: () => void
  ) => {
    try {
      const newTodo = await addTodo(todoData);
      onSuccess();
      return newTodo;
    } catch (error) {
      alert(`ToDoの追加中にエラーが発生しました: ${error}`);
      throw error;
    }
  };

  const createAddTodoHandler =
    (onClose: () => void) => async (todoData: FormTodoData) => {
      await handleAddTodo(todoData, onClose);
    };

  return { createAddTodoHandler };
};
