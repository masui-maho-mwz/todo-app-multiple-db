"use client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { ComponentProps } from "react";
import { AddTodoModal } from "../forms/add";
import styles from "./styles.module.css";

type Props = {
  addTodoProps: ComponentProps<typeof AddTodoModal>;
};

export const Sidebar = ({ addTodoProps }: Props) => {
  return (
    <div className={styles.root}>
      <AddTodoModal {...addTodoProps} />
      <div>
        <div className={styles.item}>
          <SearchIcon className={styles.icon} />
          <span className={styles.label}>検索</span>
        </div>
        <div className={styles.item}>
          <CalendarTodayIcon className={styles.icon} />
          <span className={styles.label}>今日</span>
        </div>
        <div className={styles.item}>
          <CalendarMonthIcon className={styles.icon} />
          <span className={styles.label}>全て</span>
        </div>
        <div className={styles.item}>
          <TuneIcon className={styles.icon} />
          <span className={styles.label}>フィルター</span>
        </div>
      </div>
    </div>
  );
};
