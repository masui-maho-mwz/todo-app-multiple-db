import type { Todo } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { description, categoryId, priorityId, importanceId, deadline }: Todo =
    await req.json();
  // TODO: 今後タブで選択して切り替えることができるようにしていく。
  const statusId = "cluqkhxsz000c7kqz5h3sdlh1";

  try {
    const todo = await prisma.todo.create({
      data: {
        description,
        deadline: deadline ? new Date(deadline) : null,
        categoryId,
        priorityId,
        importanceId,
        statusId,
      },
    });

    console.log("ToDo作成に成功しました");
    return NextResponse.json({ todo }, { status: 200 });
  } catch (error) {
    console.error("ToDoの作成に失敗しました:", error);
    return NextResponse.json(
      {
        message: `ToDoの作成に失敗しました, ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url, `https://${req.headers.get("host")}`);
  const statusId = url.searchParams.get("statusId");
  try {
    const todos = await prisma.todo.findMany({
      where: {
        ...(statusId && { statusId }),
      },
    });
    const categories = await prisma.category.findMany();

    const priorities = await prisma.priority.findMany();

    const importances = await prisma.importance.findMany();

    return NextResponse.json(
      { todos, categories, priorities, importances },
      { status: 200 }
    );
  } catch (error) {
    console.error("ToDoの取得に失敗しました:", error);
    return NextResponse.json(
      {
        message: `ToDoの取得に失敗しました, ${error}`,
      },
      { status: 500 }
    );
  }
}
