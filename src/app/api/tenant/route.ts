import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface TenantArg {
  name: string;
  email: string;
  roomId?: number;
  phone?: string;
  fee: number;
  startDate: Date;
  endDate?: Date;
  houseId: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, roomId, phone, fee, startDate, endDate, houseId } =
      (await req.json()) as TenantArg;

    const tenant = await prisma.tenant.create({
      data: {
        name,
        email,
        roomId,
        phone,
        fee,
        startDate,
        endDate,
        houseId,
      },
    });

    return NextResponse.json({
      tenant: { ...tenant },
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
