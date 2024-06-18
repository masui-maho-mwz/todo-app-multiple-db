import { prisma } from '@/app/api/prisma';
import { TodosGetViewModel } from '@/view-model/todo';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { format } from 'date-fns';

export async function GET(): Promise<
  NextResponse<TodosGetViewModel> | NextResponse<{ message: string }>
> {
  try {
    const records = await prisma.todo.findMany({
      orderBy: { deadline: 'asc' },
      include: {
        category: true,
        priority: true,
        importance: true,
        status: true,
      },
    });

    const todos = records.map((record) => ({
      id: record.id,
      description: record.description,
      deadline: record.deadline ? format(record.deadline, 'yyyy/MM/dd') : null,
      category: record.category,
      priority: record.priority,
      importance: record.importance,
      status: record.status,
    }));

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
    const body = bodySchema.safeParse(await req.json());

    if (!body.success) {
      return NextResponse.json(
        { message: 'Invalid request body', details: body.error },
        { status: 400 }
      );
    }

    if (!body.data.deadline) {
      const todo = await prisma.todo.create({ data: { ...body.data } });

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
