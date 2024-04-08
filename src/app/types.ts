export type Todo = {
  id: string;
  description: string;
  categoryId: string;
  priorityId: string;
  importanceId: string;
  statusId: string;
  createdAt: Date;
  deadline: Date | null;
};

export type StatusFilter = "all" | "complete" | "incomplete";

export type Category = {
  id: string;
  key: string;
  name: string;
};

export type Priority = {
  id: string;
  key: string;
  name: string;
};

export type Importance = {
  id: string;
  key: string;
  name: string;
};
