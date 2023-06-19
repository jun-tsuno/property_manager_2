import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface PaymentArg {
  tenantId: string;
}

export async function PUT(req: Request) {
  try {
    const { tenantId } = (await req.json()) as PaymentArg;

    const payment = await prisma.payment.upsert({
      where: {
        tenantId: tenantId,
      },
      update: {},
      create: {
        tenantId: tenantId,
      },
    });

    return NextResponse.json({
      receipt: payment.id,
      message: 'Successfully Updated',
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

    await prisma.payment.delete({
      where: {
        tenantId: tenantId,
      },
    });

    return NextResponse.json(true);
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
