"use client";
import { useEffect, useState } from "react";

import { DeleteTodoDialog } from "@/app/components/delete";
import EditTodoModal from "@/app/components/edit";
import { Sidebar } from "@/app/components/sidebar";
import { StatusTabs } from "@/app/components/status-tabs";
import { TodoList } from "@/app/components/todo-list";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "@/app/operations";
import {
  Category,
  Importance,
  Priority,
  StatusFilter,
  Todo,
} from "@/app/types";
import styles from "./styles.module.css";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("incomplete");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [importances, setImportances] = useState<Importance[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchTodos(statusFilter);
        setTodos(fetchedData.todos);
        setCategories(fetchedData.categories);
        setPriorities(fetchedData.priorities);
        setImportances(fetchedData.importances);
      } catch (error) {
        alert(`データのフェッチ中にエラーが発生しました: ${error}`);
      }
    };
    loadData();
  }, [statusFilter]);

  useEffect(() => {
    setFilteredTodos(
      todos.filter((todo) => {
        if (statusFilter === "all") {
          return true;
        }
        if (!todo.status) {
          todo.status = {
            id: "cluruuvds000cxhqzcyrbabnm",
            key: "incomplete",
            name: "未完了",
          };
        }
        return todo.status.key === statusFilter;
      })
    );
  }, [todos, statusFilter]);

  const handleAddTodo = async (todo: Omit<Todo, "id" | "createdAt">) => {
    try {
      const newTodo = await addTodo(todo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      alert(`ToDoの追加中にエラーが発生しました: ${error}`);
    }
  };

  const onUpdateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await updateTodo(updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return response;
          }
          return todo;
        })
      );
    } catch (error) {
      alert(
        `ToDoの更新に失敗しました。もう一度お試しください。エラー: ${error}`
      );
    }
  };

  const handleFilterChange = async (newFilter: StatusFilter) => {
    setStatusFilter(newFilter);
    try {
      const fetchedData = await fetchTodos(newFilter);
      setTodos(fetchedData.todos);
    } catch (error) {
      alert(`データのフェッチ中にエラーが発生しました: ${error}`);
    }
  };

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingTodo(null);
    setShowEditModal(false);
  };

  const openDeleteDialog = (todoId: string) => {
    setDeletingTodoId(todoId);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setDeletingTodoId(null);
    setShowDeleteDialog(false);
  };

  const confirmDeleteTodo = async () => {
    if (deletingTodoId) {
      try {
        await deleteTodo(deletingTodoId);
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== deletingTodoId)
        );
      } catch (error) {
        alert(`ToDoの削除中にエラーが発生しました: ${error}`);
      } finally {
        closeDeleteDialog();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formAndList}>
        <Sidebar
          handleAddTodo={handleAddTodo}
          categories={categories}
          priorities={priorities}
          importances={importances}
        />
        <div className={styles.todoListContainer}>
          <div className={styles.todoListWrapper}>
            <StatusTabs
              setStatusFilter={handleFilterChange}
              activeFilter={statusFilter}
            />
            <TodoList
              todos={filteredTodos}
              openEditModal={openEditModal}
              handleDeleteTodo={openDeleteDialog}
              onUpdateTodo={onUpdateTodo}
            />
          </div>
        </div>
      </div>
      {showEditModal && editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onClose={closeEditModal}
          onUpdateTodo={onUpdateTodo}
          categories={categories}
          priorities={priorities}
          importances={importances}
        />
      )}
      {showDeleteDialog && deletingTodoId && (
        <DeleteTodoDialog
          todoId={deletingTodoId}
          onClose={closeDeleteDialog}
          onConfirm={confirmDeleteTodo}
        />
      )}
    </div>
  );
};

export default Home;
