import cuid from "cuid";
import { prisma } from "./index";

export const createCategories = async () => {
  const data = [
    { id: cuid(), key: "leisure", name: "レジャー" },
    { id: cuid(), key: "hobby", name: "趣味" },
    { id: cuid(), key: "housework", name: "家事" },
    { id: cuid(), key: "work", name: "仕事" },
    { id: cuid(), key: "study", name: "勉強" },
    { id: cuid(), key: "other", name: "他" },
  ];
  await prisma.category.createMany({ data });
};
