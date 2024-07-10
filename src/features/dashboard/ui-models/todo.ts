export type TodoUiModel = {
  id: string;
  description: string;
  deadline: string | null;
  category: { key: string; name: string } | null;
  priority: { key: string; name: string } | null;
  importance: { key: string; name: string } | null;
  status: { key: string; name: string };
};

export type CategoryUiModel = { key: string; name: string };
export type PriorityUiModel = { key: string; name: string };
export type ImportanceUiModel = { key: string; name: string };
