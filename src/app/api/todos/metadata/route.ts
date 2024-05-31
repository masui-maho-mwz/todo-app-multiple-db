import { prisma } from '@/app/api/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
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
      { message: `ToDoの取得に失敗しました, ${error}` },
      { status: 500 }
    );
  }
}
