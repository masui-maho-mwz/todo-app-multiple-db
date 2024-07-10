import { prisma } from '@/app/api/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const paramsSchema = z.object({ id: z.string().cuid2() });
  const bodySchema = z.object({ statusKey: z.string() });

  try {
    const validatedParams = paramsSchema.safeParse(params);
    if (!validatedParams.success) {
      return NextResponse.json(
        { message: 'Invalid request params', details: validatedParams.error },
        { status: 400 }
      );
    }

    const validatedBody = bodySchema.safeParse(await req.json());
    if (!validatedBody.success) {
      return NextResponse.json(
        { message: 'Invalid request body', details: validatedBody.error },
        { status: 400 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: validatedParams.data.id },
      data: { statusKey: validatedBody.data.statusKey },
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
