import type { StatusFilter } from "@/app/types";
import styles from "./styles.module.css";

type Props = {
  setStatusFilter: (filter: StatusFilter) => Promise<void>;
  activeFilter: StatusFilter;
};

export const StatusTabs = ({ setStatusFilter, activeFilter }: Props) => {
  const tabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "全て" },
    { key: "complete", label: "完了" },
    { key: "incomplete", label: "未完了" },
  ];
  const handleTabClick = (key: StatusFilter) => {
    setStatusFilter(key);
  };

  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.tab} ${
            tab.key === activeFilter ? styles.activeTab : ""
          }`}
          onClick={() => handleTabClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
