import { createCategories } from "./categories";
import { createImportants } from "./importants";
import { createPriorities } from "./priorities";
import { createStatuses } from "./statuses";
import { createTodos } from "./todos";

const seed = async () => {
  await createCategories();
  await createImportants();
  await createPriorities();
  await createStatuses();
  await createTodos();
};

seed();
