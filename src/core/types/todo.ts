export type TodoViewModel = {
  id: string;
  description: string;
  deadline?: string;
  category: { key: string; name: string };
  priority: { key: string; name: string };
  importance: { key: string; name: string };
  status: { key: string; name: string };
};
