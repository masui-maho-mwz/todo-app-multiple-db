import { prisma } from "@/app/lib/prisma";
import cuid from "cuid";

export const createTodos = async () => {
  const data = [
    {
      id: cuid(),
      description: "test1",
      categoryKey: "leisure",
      priorityKey: "high",
      importanceKey: "medium",
      statusKey: "incomplete",
      createdAt: new Date(),
      deadline: new Date(),
    },
    {
      id: cuid(),
      description: "test2",
      categoryKey: "housework",
      priorityKey: "low",
      importanceKey: "high",
      statusKey: "incomplete",
      createdAt: new Date(),
      deadline: new Date(),
    },
  ];
  await prisma.todo.createMany({ data });
};
