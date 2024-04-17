import { prisma } from "@/app/lib/prisma";
import type { Todo } from "@/app/types";
import { NextResponse, type NextRequest } from "next/server";

const parseDeadline = (deadline: string | null | undefined): Date | null => {
  if (!deadline) return null;
  const parsedDate = Date.parse(deadline);
  if (isNaN(parsedDate)) {
    throw new Error("Invalid deadline format. Please use a valid date.");
  }
  return new Date(parsedDate);
};

export async function POST(req: NextRequest) {
  try {
    const {
      description,
      categoryKey,
      priorityKey,
      importanceKey,
      deadline,
    }: Todo = await req.json();

    const validStatusKey = await prisma.status.findUnique({
      where: { key: "incomplete" },
    });

    if (!validStatusKey) {
      return NextResponse.json(
        { message: "Incomplete status not found" },
        { status: 404 }
      );
    }

    const validDeadline = parseDeadline(deadline);
    const todo = await prisma.todo.create({
      data: {
        description,
        categoryKey,
        priorityKey,
        importanceKey,
        statusKey: validStatusKey.key,
        deadline: validDeadline,
      },
      include: {
        status: true,
        category: true,
        priority: true,
        importance: true,
      },
    });

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      const status = error.message.startsWith("Invalid deadline") ? 400 : 500;
      return NextResponse.json(
        {
          message: `ToDoの作成に失敗しました: ${error.message}`,
        },
        { status }
      );
    } else {
      return NextResponse.json(
        {
          message: `ToDoの作成に失敗しました: unknown error`,
        },
        { status: 500 }
      );
    }
  }
}
export async function GET(req: NextRequest) {
  const url = new URL(req.url, `https://${req.headers.get("host")}`);
  const statusKey = url.searchParams.get("status");

  const statusCondition: { statusKey?: string } = {};
  if (statusKey && statusKey !== "all") {
    const status = await prisma.status.findUnique({
      where: { key: statusKey },
    });
    if (status) {
      statusCondition.statusKey = status.key;
    }
  }

  try {
    const todos = await prisma.todo.findMany({
      where: {
        ...statusCondition,
      },
      include: {
        category: true,
        priority: true,
        importance: true,
        status: true,
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
    return NextResponse.json(
      {
        message: `ToDoの取得に失敗しました, ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, description, categoryKey, priorityKey, importanceKey, deadline } =
    body;
  const statusKey = body.status.key;
  try {
    const status = await prisma.status.findUnique({
      where: { key: statusKey },
    });

    if (!status) {
      return NextResponse.json(
        { message: `Status with key ${statusKey} not found.` },
        { status: 404 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        description,
        categoryKey,
        priorityKey,
        importanceKey,
        deadline: deadline ? new Date(deadline) : null,
        statusKey: status.key,
      },
      include: {
        status: true,
        category: true,
        priority: true,
        importance: true,
      },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `ToDoの更新に失敗しました。, ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url, `https://${req.headers.get("host")}`);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "IDが指定されていません。" },
      { status: 400 }
    );
  }

  try {
    await prisma.todo.delete({
      where: { id: String(id) },
    });

    return NextResponse.json(
      { message: "ToDoが正常に削除されました。" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `ToDoの削除に失敗しました。, ${error}` },
      { status: 500 }
    );
  }
}
