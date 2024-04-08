import cuid from "cuid";
import { prisma } from "./index";

export const createImportants = async () => {
  const data = [
    { id: cuid(), key: "high", name: "高" },
    { id: cuid(), key: "medium", name: "中" },
    { id: cuid(), key: "low", name: "低" },
  ];
  await prisma.importance.createMany({ data });
};
