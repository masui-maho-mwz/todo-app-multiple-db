import { updateTodo } from "@/app/operations";
import { Todo, type FormTodoData } from "@/app/types";
import { formatISO, parseISO } from "date-fns";

export const useEditTodo = () => {
  const updateTodoHandler = async (todo: Todo, formData: FormTodoData) => {
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
      await updateTodo(updatedTodo);
    } catch (error) {
      alert(`ToDoの更新に失敗しました。エラー: ${error}`);
      throw error;
    }
  };

  return { updateTodoHandler };
};
