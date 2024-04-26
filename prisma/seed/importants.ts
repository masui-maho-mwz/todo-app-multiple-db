import { prisma } from "@/app/api/prisma";

export const createImportants = async () => {
  const data = [
    { key: "high", name: "高" },
    { key: "medium", name: "中" },
    { key: "low", name: "低" }
  ];
  await prisma.importance.createMany({ data });
};
