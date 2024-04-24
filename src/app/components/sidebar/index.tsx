'use client';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { AddTodoModal } from '../forms/add';
import styles from './styles.module.css';
import { ComponentProps } from 'react';

type Props = {
  addTodoProps: ComponentProps<typeof AddTodoModal>;
};

export const Sidebar = ({ addTodoProps }: Props) => {
  return (
    <div className={styles.container}>
      <AddTodoModal {...addTodoProps} />
      <div>
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
    </div>
  );
};
