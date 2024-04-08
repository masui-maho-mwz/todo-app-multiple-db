import cuid from "cuid";
import { prisma } from "./index";

export const createStatuses = async () => {
  const data = [
    { id: cuid(), key: "incomplete", name: "未完了" },
    { id: cuid(), key: "complete", name: "完了" },
  ];
  await prisma.status.createMany({ data });
};
