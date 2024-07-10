-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_todos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "statusKey" TEXT NOT NULL,
    "categoryKey" TEXT,
    "priorityKey" TEXT,
    "importanceKey" TEXT,
    "deadline" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "todos_statusKey_fkey" FOREIGN KEY ("statusKey") REFERENCES "statuses" ("key") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "todos_categoryKey_fkey" FOREIGN KEY ("categoryKey") REFERENCES "categories" ("key") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "todos_priorityKey_fkey" FOREIGN KEY ("priorityKey") REFERENCES "priorities" ("key") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "todos_importanceKey_fkey" FOREIGN KEY ("importanceKey") REFERENCES "importants" ("key") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_todos" ("categoryKey", "createdAt", "deadline", "description", "id", "importanceKey", "priorityKey", "statusKey") SELECT "categoryKey", "createdAt", "deadline", "description", "id", "importanceKey", "priorityKey", "statusKey" FROM "todos";
DROP TABLE "todos";
ALTER TABLE "new_todos" RENAME TO "todos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
