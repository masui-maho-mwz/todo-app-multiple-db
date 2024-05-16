'use client';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { ComponentProps } from 'react';
import { AddTodoModal } from '../forms/add-todo-modal';
import styles from './styles.module.css';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  onClickOpenAdd: () => void;
};

export const Sidebar = ({ onClickOpenAdd }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.add} onClick={onClickOpenAdd}>
        <AddIcon className={styles.icon} />
        <span className={styles.label}>タスクを追加</span>
      </div>
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
