import { addTodo } from "@/app/operations";
import { type FormTodoData } from "@/app/types";

export const useAddTodo = () => {
  const handleAddTodo = async (todoData: FormTodoData) => {
    try {
      const newTodo = await addTodo(todoData);
      return newTodo;
    } catch (error) {
      alert(`ToDoの追加中にエラーが発生しました: ${error}`);
      throw error;
    }
  };

  const createAddTodoHandler = () => async (todoData: FormTodoData) => {
    await handleAddTodo(todoData);
  };

  return { createAddTodoHandler };
};
