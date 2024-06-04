import { prisma } from '@/app/api/prisma';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const paramsSchema = z.object({
    id: z.string().cuid2(),
  });
  const bodySchema = z.object({
    description: z
      .string()
      .min(1, 'Todoは入力必須です。')
      .max(140, '説明は140字以内である必要があります'),
    categoryKey: z.string().optional(),
    priorityKey: z.string().optional(),
    importanceKey: z.string().optional(),
    statusKey: z.string(),
    deadline: z.string().optional(),
  });

  try {
    const validatedBody = bodySchema.safeParse(await req.json());
    if (!validatedBody.success) {
      return NextResponse.json(
        { message: 'Invalid request body', details: validatedBody.error },
        { status: 400 }
      );
    }

    const validatedParams = paramsSchema.safeParse(params);
    if (!validatedParams.success) {
      return NextResponse.json(
        { message: 'Invalid request params', details: validatedParams.error },
        { status: 400 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: validatedParams.data.id },
      data: {
        description: validatedBody.data.description,
        categoryKey: validatedBody.data.categoryKey,
        priorityKey: validatedBody.data.priorityKey,
        importanceKey: validatedBody.data.importanceKey,
        deadline: validatedBody.data.deadline
          ? new Date(validatedBody.data.deadline)
          : null,
        statusKey: validatedBody.data.statusKey,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const paramsSchema = z.object({
    id: z.string().cuid2(),
  });

  const validatedParams = paramsSchema.safeParse(params);
  if (!validatedParams.success) {
    return NextResponse.json(
      { message: 'Invalid request params', details: validatedParams.error },
      { status: 400 }
    );
  }

  if (!validatedParams.success) {
    return NextResponse.json({ message: 'IDが不正です' }, { status: 400 });
  }

  try {
    await prisma.todo.delete({
      where: { id: validatedParams.data.id },
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
