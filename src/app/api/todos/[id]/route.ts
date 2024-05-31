import { prisma } from '@/app/api/prisma';
import { NextResponse, type NextRequest } from 'next/server';

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
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { message: 'IDが指定されていません。' },
      { status: 400 }
    );
  }

  try {
    await prisma.todo.delete({
      where: { id: String(id) },
    });

    return NextResponse.json(
      { message: 'ToDoが正常に削除されました。' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `ToDoの削除に失敗しました。, ${error}` },
      { status: 500 }
    );
  }
}
