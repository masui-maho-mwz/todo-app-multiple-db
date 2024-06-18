export type TodosGetViewModel = {
  todos: {
    id: string;
    description: string;
    deadline: string | null;
    category: { key: string; name: string } | null;
    priority: { key: string; name: string } | null;
    importance: { key: string; name: string } | null;
    status: { key: string; name: string };
  }[];
};

export type TodosMetadataGetViewModel = {
  categories: { key: string; name: string }[];
  priorities: { key: string; name: string }[];
  importances: { key: string; name: string }[];
};

export type TodosStatusesGetViewModel = {
  statuses: { key: string; name: string }[];
};
