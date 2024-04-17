import { z } from "zod";

export const CategoryKeyEnum = z.enum([
  "leisure",
  "hobby",
  "housework",
  "work",
  "study",
  "other",
]);
export const PriorityKeyEnum = z.enum(["high", "medium", "low"]);
export const ImportanceKeyEnum = z.enum(["high", "medium", "low"]);
export const StatusKeyEnum = z.enum(["complete", "incomplete"]);

export const categorySchema = z.object({
  key: CategoryKeyEnum,
  name: z.string(),
});

export const prioritySchema = z.object({
  key: PriorityKeyEnum,
  name: z.string(),
});

export const importanceSchema = z.object({
  key: ImportanceKeyEnum,
  name: z.string(),
});

export const statusSchema = z.object({
  key: StatusKeyEnum,
  name: z.string(),
});

export const todoSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .min(1, "Todoは入力必須です。")
    .max(140, "説明は140字以内である必要があります"),
  categoryKey: CategoryKeyEnum,
  category: categorySchema.optional(),
  priorityKey: PriorityKeyEnum,
  priority: prioritySchema.optional(),
  importanceKey: ImportanceKeyEnum,
  importance: importanceSchema.optional(),
  statusKey: StatusKeyEnum,
  status: statusSchema.optional(),
  createdAt: z.date().optional(),
  deadline: z.string().nullable().optional(),
});

export type Todo = z.infer<typeof todoSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Priority = z.infer<typeof prioritySchema>;
export type Importance = z.infer<typeof importanceSchema>;
export type Status = z.infer<typeof statusSchema>;
export type StatusKeys = z.infer<typeof statusSchema.shape.key>;

export const statusFilterSchema = z.enum(["all", "complete", "incomplete"]);
export type StatusFilter = z.infer<typeof statusFilterSchema>;

export type FetchTodosResponse = {
  todos: Todo[];
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
};

export const CategoryKeys = [
  { key: "leisure", name: "レジャー" },
  { key: "hobby", name: "趣味" },
  { key: "housework", name: "家事" },
  { key: "work", name: "仕事" },
  { key: "study", name: "勉強" },
  { key: "other", name: "他" },
] as const;

export type CategoryKey = (typeof CategoryKeys)[number]["key"];
export type CategoryName = (typeof CategoryKeys)[number]["name"];

export type SelectedCategory = {
  key: CategoryKey;
  name: CategoryName;
};

export const PriorityKeys = [
  { key: "high", name: "高" },
  { key: "medium", name: "中" },
  { key: "low", name: "低" },
] as const;

export type PriorityKey = (typeof PriorityKeys)[number]["key"];
export type PriorityName = (typeof PriorityKeys)[number]["name"];

export const ImportanceKeys = [
  { key: "high", name: "高" },
  { key: "medium", name: "中" },
  { key: "low", name: "低" },
] as const;

export type ImportanceKey = (typeof ImportanceKeys)[number]["key"];
export type ImportanceName = (typeof ImportanceKeys)[number]["name"];

export const StatusKeys = [
  { key: "incomplete", name: "未完了" },
  { key: "complete", name: "完了" },
] as const;

export type StatusKey = (typeof StatusKeys)[number]["key"];
export type StatusName = (typeof StatusKeys)[number]["name"];
