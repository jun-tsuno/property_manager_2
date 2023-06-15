import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Owner } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

interface HouseArg {
  houseName: string;
  location: string;
  ownerId: string;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { id: ownerId } = session?.user as Owner;

  try {
    const { houseName, location } = (await req.json()) as HouseArg;

    const house = await prisma.house.create({
      data: {
        houseName: houseName,
        location: location,
        ownerId: ownerId,
      },
    });

    return NextResponse.json({
      house: { ...house },
      message: 'Successfully Created',
    });
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

// /api/house?id=*****
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ownerId = searchParams.get('id');

  if (!ownerId) return NextResponse.json({ message: 'No such owner' });

  try {
    const houseList = await prisma.house.findMany({
      where: {
        ownerId: ownerId,
      },
    });

    return NextResponse.json({
      houseList,
    });
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
