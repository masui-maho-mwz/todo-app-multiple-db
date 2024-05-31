import { prisma } from '@/app/api/prisma';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { deadline: 'asc' },
      include: {
        category: true,
        priority: true,
        importance: true,
        status: true,
      },
    });

    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `ToDoの取得に失敗しました, ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const bodySchema = z.object({
    id: z.string().cuid2(),
    description: z
      .string()
      .min(1, 'Todoは入力必須です。')
      .max(140, '説明は140字以内である必要があります'),
    categoryKey: z.string(),
    priorityKey: z.string(),
    importanceKey: z.string(),
    statusKey: z.string(),
    deadline: z.string().nullable(),
  });

  try {
    const body = bodySchema.safeParse(await req.json());

    if (!body.success) {
      return NextResponse.json(
        { message: 'Invalid request body', details: body.error },
        { status: 400 }
      );
    }

    if (!body.data.deadline) {
      const todo = await prisma.todo.create({
        data: { ...body.data },
        include: {
          status: true,
          category: true,
          priority: true,
          importance: true,
        },
      });

      return NextResponse.json(todo, { status: 200 });
    }

    const deadline = parseDeadline(body.data.deadline);

    if (!deadline.ok) {
      return NextResponse.json(
        { message: 'Invalid request body', details: 'Invalid deadline' },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.create({
      data: { ...body.data, deadline: deadline.datetime },
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
      const status = error.message.startsWith('Invalid deadline') ? 400 : 500;
      return NextResponse.json(
        { message: `ToDoの作成に失敗しました: ${error.message}` },
        { status }
      );
    } else {
      return NextResponse.json(
        { message: `ToDoの作成に失敗しました: unknown error` },
        { status: 500 }
      );
    }
  }
}

const parseDeadline = (
  deadline: string
): { ok: true; datetime: Date } | { ok: false; datetime: null } => {
  const parsedDate = Date.parse(deadline);

  if (isNaN(parsedDate)) {
    if (!deadline) return { ok: false, datetime: null };
  }
  return { ok: true, datetime: new Date(parsedDate) };
};
