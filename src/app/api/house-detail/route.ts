import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const houseId = searchParams.get('id');

  if (!houseId) return NextResponse.json({ message: 'No such house' });

  try {
    const houseDetail = await prisma.house.findUnique({
      where: { id: houseId },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            roomId: true,
            fee: true,
            endDate: true,
          },
        },
      },
    });

    return NextResponse.json({ houseDetail });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          message: error.message,
        }),
        { status: 500 },
      );
    }
  }
}
