import { prisma } from '@/app/api/prisma';
import { TodosMetadataGetViewModel } from '@/view-model/todo';
import { NextResponse } from 'next/server';

export async function GET(): Promise<
  NextResponse<TodosMetadataGetViewModel> | NextResponse<{ message: string }>
> {
  try {
    const categories = await prisma.category.findMany();
    const priorities = await prisma.priority.findMany();
    const importances = await prisma.importance.findMany();

    return NextResponse.json(
      { categories, priorities, importances },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `ToDoメタデータの取得に失敗しました, ${error}` },
      { status: 500 }
    );
  }
}
