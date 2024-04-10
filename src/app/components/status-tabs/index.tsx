import type { StatusFilter } from "@/app/types";
import React, { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  setStatusFilter: (filter: StatusFilter) => void;
};

export const StatusTabs: React.FC<Props> = ({ setStatusFilter }) => {
  const tabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "全て" },
    { key: "complete", label: "完了" },
    { key: "incomplete", label: "未完了" },
  ];

  const [activeTab, setActiveTab] = useState<StatusFilter>("incomplete");

  const handleTabClick = (key: StatusFilter) => {
    setActiveTab(key);
    setStatusFilter(key);
  };

  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.tab} ${
            tab.key === activeTab ? styles.activeTab : ""
          }`}
          onClick={() => handleTabClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
