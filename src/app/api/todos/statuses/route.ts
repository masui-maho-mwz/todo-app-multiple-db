import { prisma } from '@/app/api/prisma';
import { TodosStatusesGetViewModel } from '@/view-model/todo';
import { NextResponse } from 'next/server';

export async function GET(): Promise<
  NextResponse<TodosStatusesGetViewModel> | NextResponse<{ message: string }>
> {
  try {
    const statuses = await prisma.status.findMany();

    return NextResponse.json({ statuses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `ステータスの取得に失敗しました, ${error}` },
      { status: 500 }
    );
  }
}
