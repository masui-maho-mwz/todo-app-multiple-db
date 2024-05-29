export type TodoUiModel = {
  id: string;
  description: string;
  deadline?: string;
  category: { key: string; name: string };
  priority: { key: string; name: string };
  importance: { key: string; name: string };
  status: { key: string; name: string };
};

export type CategoryUiModel = { key: string; name: string };
export type PriorityUiModel = { key: string; name: string };
export type ImportanceUiModel = { key: string; name: string };
