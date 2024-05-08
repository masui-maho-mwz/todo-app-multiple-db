-- CreateTable
CREATE TABLE "todos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "categoryKey" TEXT NOT NULL,
    "priorityKey" TEXT NOT NULL,
    "importanceKey" TEXT NOT NULL,
    "statusKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" DATETIME,
    CONSTRAINT "todos_categoryKey_fkey" FOREIGN KEY ("categoryKey") REFERENCES "categories" ("key") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "todos_priorityKey_fkey" FOREIGN KEY ("priorityKey") REFERENCES "priorities" ("key") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "todos_importanceKey_fkey" FOREIGN KEY ("importanceKey") REFERENCES "importants" ("key") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "todos_statusKey_fkey" FOREIGN KEY ("statusKey") REFERENCES "statuses" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categories" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "priorities" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "importants" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "statuses" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
