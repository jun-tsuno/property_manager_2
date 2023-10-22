import { prisma } from '@/lib/prisma';
import { checkAuthentication } from '@/utils/check-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const isAuthenticated = await checkAuthentication();
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('id');

  if (!isAuthenticated) {
    throw new Error('Not Authenticated');
  }

  if (!tenantId)
    return Response.json('Tenant id is not defined', {
      status: 400,
      statusText: 'Bad Request',
    });

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    return Response.json(tenant);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(error, {
        status: 500,
        statusText: 'Cannot find a tenant',
      });
    }
  }
}

export async function POST(req: Request) {
  const isAuthenticated = await checkAuthentication();
  const { name, email, roomId, phone, fee, startDate, endDate, houseId } =
    await req.json();

  if (!isAuthenticated) {
    throw new Error('Not Authorized');
  }

  try {
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

    return Response.json(tenant);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      return Response.json(error, {
        status: 500,
        statusText: error.message,
      });
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
