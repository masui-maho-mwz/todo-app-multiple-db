import { prisma } from "@/app/api/prisma";
import { createId } from "@paralleldrive/cuid2";

export const createTodos = async () => {
  const data = [
    {
      id: createId(),
      description: "test1",
      categoryKey: "leisure",
      priorityKey: "high",
      importanceKey: "medium",
      statusKey: "incomplete",
      createdAt: new Date(),
      deadline: new Date()
    },
    {
      id: createId(),
      description: "test2",
      categoryKey: "housework",
      priorityKey: "low",
      importanceKey: "high",
      statusKey: "incomplete",
      createdAt: new Date(),
      deadline: new Date()
    }
  ];
  await prisma.todo.createMany({ data });
};
