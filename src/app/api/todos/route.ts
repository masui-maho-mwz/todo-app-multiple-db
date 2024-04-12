import type { Todo } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { description, categoryId, priorityId, importanceId, deadline }: Todo =
    await req.json();

  const incompleteStatus = await prisma.status.findUnique({
    where: { key: "incomplete" },
  });

  if (!incompleteStatus) {
    return NextResponse.json(
      { message: "Incomplete status not found" },
      { status: 500 }
    );
  }

  try {
    const todo = await prisma.todo.create({
      data: {
        description,
        deadline: deadline ? new Date(deadline) : null,
        categoryId,
        priorityId,
        importanceId,
        statusId: incompleteStatus.id,
      },
    });

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
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
  const statusKey = url.searchParams.get("status");
  let statusCondition = {};
  if (statusKey && statusKey !== "all") {
    const status = await prisma.status.findUnique({
      where: { key: statusKey },
    });

    if (status) {
      statusCondition = { statusId: status.id };
    }
  }

  try {
    const todos = await prisma.todo.findMany({
      where: {
        ...statusCondition,
      },
      include: {
        status: true,
        category: true, // 今後カテゴリ情報も使う予定
        priority: true, // 今後優先度情報も使う予定
        importance: true, // 今後重要度情報も使う予定
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
  const url = new URL(req.url, `https://${req.headers.get("host")}`);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        message: `IDが指定されていません, `,
      },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { status } = body;

  try {
    const statusRecord = await prisma.status.findUnique({
      where: { key: status },
    });

    if (!statusRecord) {
      return NextResponse.json(
        {
          message: `ステータスが見つかりません。`,
        },
        { status: 404 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: String(id) },
      data: { statusId: statusRecord.id },
      include: {
        status: true,
        category: true,
        priority: true,
        importance: true,
      },
    });

    return NextResponse.json({ updatedTodo }, { status: 200 });
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
