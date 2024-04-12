export type Todo = {
  id: string;
  description: string;
  categoryId: string;
  category?: Category;
  priorityId: string;
  priority?: Priority;
  importanceId: string;
  importance?: Importance;
  status: Status;
  createdAt: Date;
  deadline: Date | null;
};

export type Category = {
  id: string;
  key: "leisure" | "hobby" | "housework" | "work" | "study" | "other"; //TODO: 複数箇所で使いそうだったらStatusKeysのように型にする
  name: string;
};

export type Priority = {
  id: string;
  key: "high" | "medium" | "low"; //TODO: 複数箇所で使いそうだったらSStatusKeysのように型にする
  name: string;
};

export type Importance = {
  id: string;
  key: "high" | "medium" | "low"; //TODO: 複数箇所で使いそうだったらStatusKeysのように型にする
  name: string;
};

export type Status = {
  id: string;
  key: StatusKeys;
  name: string;
};

export type StatusKeys = "complete" | "incomplete";

export type StatusFilter = "all" | "complete" | "incomplete";
