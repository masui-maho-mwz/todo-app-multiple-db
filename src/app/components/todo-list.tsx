"use client";

type Props = {
  todos: any[];
  // handleUpdateTodo: (id: string, updates: any) => void;
  // handleDeleteTodo: (id: string) => void;
};

export const TodoList: React.FC<Props> = (props: Props) => {
  return <div>一覧の実装は一旦後で。まずDBに登録する</div>;
};

// "use client";
// import React from "react";

// type Props = {
//   todos: any[];
//   handleUpdateTodo: (id: string, updates: any) => void;
//   handleDeleteTodo: (id: string) => void;
// };

// export const TodoList: React.FC<Props> = ({
//   todos,
//   handleUpdateTodo,
//   handleDeleteTodo,
// }) => {
//   return (
//     <div>
//       {todos.length > 0 ? (
//         todos.map((todo) => (
//           <div key={todo.id}>
//             <p>{todo.description}</p>
//             <button
//               onClick={() =>
//                 handleUpdateTodo(todo.id, {
//                   ...todo,
//                   completed: !todo.completed,
//                 })
//               }
//             >
//               {todo.completed ? "未完了にする" : "完了にする"}
//             </button>
//             <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
//           </div>
//         ))
//       ) : (
//         <p>Todo がありません。</p>
//       )}
//     </div>
//   );
// };
