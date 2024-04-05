"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type Props = {
  handleAddTodo: (todo: string) => void;
};

export const AddTodo: React.FC<Props> = ({ handleAddTodo }) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleAddTodo(todo);
    setTodo("");
  };

  const handleChangeTodo = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        name="name"
        value={todo}
        onChange={handleChangeTodo}
        placeholder="新しいリストを入力してください"
      />
      <button type="submit">追加</button>
    </form>
  );
};
