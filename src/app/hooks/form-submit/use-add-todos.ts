import { addTodo } from "@/app/operations";
import { type FormTodoData } from "@/app/types";

export const addTodoHandler = async (todoData: FormTodoData) => {
  try {
    const newTodo = await addTodo(todoData);
    return newTodo;
  } catch (error) {
    alert(`ToDoの追加中にエラーが発生しました: ${error}`);
    throw error;
  }
};
