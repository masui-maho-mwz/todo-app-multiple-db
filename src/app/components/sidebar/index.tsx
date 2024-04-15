"use client";
import { Category, Importance, Priority, Todo } from "@/app/types";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import { AddTodoModal } from "../add";
import styles from "./styles.module.css";

type Props = {
  handleAddTodo: (todo: Omit<Todo, "id" | "createdAt">) => void;
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
};

export const Sidebar = ({
  handleAddTodo,
  categories,
  priorities,
  importances,
}: Props) => {
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);

  const openAddModal = () => setShowAddTodoModal(true);
  const closeAddModal = () => setShowAddTodoModal(false);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.sidebarItem} onClick={openAddModal}>
          <AddIcon className={styles.icon} />
          <span className={styles.label}>タスクを追加</span>
        </div>
        <div className={styles.sidebarItem}>
          <SearchIcon className={styles.icon} />
          <span className={styles.label}>検索</span>
        </div>
        <div className={styles.sidebarItem}>
          <CalendarTodayIcon className={styles.icon} />
          <span className={styles.label}>今日</span>
        </div>
        <div className={styles.sidebarItem}>
          <CalendarMonthIcon className={styles.icon} />
          <span className={styles.label}>全て</span>
        </div>
        <div className={styles.sidebarItem}>
          <TuneIcon className={styles.icon} />
          <span className={styles.label}>フィルター</span>
        </div>
      </div>
      {showAddTodoModal && (
        <AddTodoModal
          onClose={closeAddModal}
          onAddTodo={handleAddTodo}
          categories={categories}
          priorities={priorities}
          importances={importances}
        />
      )}
    </div>
  );
};
