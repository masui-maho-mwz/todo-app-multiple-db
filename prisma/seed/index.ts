import { PrismaClient } from "@prisma/client";
import { createCategories } from "./categories";
import { createImportants } from "./importants";
import { createPriorities } from "./priorities";
import { createStatuses } from "./statuses";

export const prisma = new PrismaClient();

const seed = async () => {
  await createCategories();
  await createImportants();
  await createPriorities();
  await createStatuses();
};

seed();
