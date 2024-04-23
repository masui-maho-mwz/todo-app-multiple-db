import { StatusKeyEnum, StatusLabels, type StatusFilter } from "@/app/types";
import styles from "./styles.module.css";

type Props = {
  handleFilterChange: (filter: StatusFilter) => Promise<void>;
  activeFilter: StatusFilter;
};

export const StatusTabs = ({ handleFilterChange, activeFilter }: Props) => {
  const tabs: { key: StatusFilter; label: string }[] = [
    { key: StatusKeyEnum.Enum.all, label: StatusLabels.all },
    { key: StatusKeyEnum.Enum.complete, label: StatusLabels.complete },
    { key: StatusKeyEnum.Enum.incomplete, label: StatusLabels.incomplete },
  ];
  const handleTabClick = (key: StatusFilter) => {
    handleFilterChange(key);
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