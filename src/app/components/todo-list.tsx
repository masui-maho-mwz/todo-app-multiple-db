"use client";

type Props = {
  todos: string[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      ) : (
        <div>Todo がありません。</div>
      )}
    </div>
  );
};
