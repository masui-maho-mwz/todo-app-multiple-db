import { prisma } from "@/app/lib/prisma";

export const createStatuses = async () => {
  const data = [
    { key: "incomplete", name: "未完了" },
    { key: "complete", name: "完了" },
  ];
  await prisma.status.createMany({ data });
};
