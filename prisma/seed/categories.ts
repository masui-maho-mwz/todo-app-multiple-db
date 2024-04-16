import { prisma } from "@/app/lib/prisma";

export const createCategories = async () => {
  const data = [
    { key: "leisure", name: "レジャー" },
    { key: "hobby", name: "趣味" },
    { key: "housework", name: "家事" },
    { key: "work", name: "仕事" },
    { key: "study", name: "勉強" },
    { key: "other", name: "他" },
  ];
  await prisma.category.createMany({ data });
};
