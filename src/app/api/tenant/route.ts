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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('id');

  if (!tenantId) return NextResponse.json({ message: 'No such tenant' });

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    return NextResponse.json({ tenant });
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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get('id');

    if (!tenantId) return NextResponse.json({ message: 'No such tenant' });

    await prisma.tenant.delete({
      where: { id: tenantId },
    });

    return NextResponse.json({ message: 'Successfully deleted' });
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
