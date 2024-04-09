import type { StatusFilter } from "@/app/types";
import React from "react";

type Props = {
  setStatusFilter: (filter: StatusFilter) => void;
};

export const StatusTabs: React.FC<Props> = ({ setStatusFilter }) => {
  const tabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "全て" },
    { key: "complete", label: "完了" },
    { key: "incomplete", label: "未完了" },
  ];

  return (
    <div>
      {tabs.map((tab) => (
        <button key={tab.key} onClick={() => setStatusFilter(tab.key)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};
