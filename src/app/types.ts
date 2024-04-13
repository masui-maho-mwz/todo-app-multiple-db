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
  deadline: string | null;
};

export type Category = {
  id: string;
  key: CategoryKey;
  name: string;
};

export type Priority = {
  id: string;
  key: LevelKey;
  name: string;
};

export type Importance = {
  id: string;
  key: LevelKey;
  name: string;
};

export type Status = {
  id: string;
  key: StatusKeys;
  name: string;
};

export type StatusKeys = "complete" | "incomplete";

export type StatusFilter = "all" | "complete" | "incomplete";

type LevelKey = "high" | "medium" | "low";

type CategoryKey =
  | "leisure"
  | "hobby"
  | "housework"
  | "work"
  | "study"
  | "other";
