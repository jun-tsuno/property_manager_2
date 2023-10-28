import { prisma } from '@/lib/prisma';
import { checkAuthentication } from '@/utils/check-auth';

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
      include: {
        house: {
          select: {
            id: true,
            houseName: true,
            location: true,
          },
        },
      },
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
  const {
    name,
    email,
    roomId,
    phone,
    fee,
    startDate,
    endDate,
    avatar,
    houseId,
  } = await req.json();

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
        avatar,
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

export async function PATCH(req: Request) {
  const isAuthenticated = await checkAuthentication();
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('id');

  const {
    name,
    email,
    roomId,
    phone,
    fee,
    startDate,
    endDate,
    avatar,
    houseId,
  } = await req.json();

  if (!isAuthenticated) {
    throw new Error('Not Authorized');
  }

  if (!tenantId)
    return Response.json('Tenant id is not defined', {
      status: 400,
      statusText: 'Bad Request',
    });

  try {
    const tenant = await prisma.tenant.update({
      where: {
        id: tenantId,
      },
      data: {
        name,
        email,
        roomId,
        phone,
        fee,
        startDate,
        endDate,
        avatar,
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
  const isAuthenticated = await checkAuthentication();
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('id');

  if (!isAuthenticated) {
    throw new Error('Not Authorized');
  }

  if (!tenantId)
    return Response.json('Tenant id is not defined', {
      status: 400,
      statusText: 'Bad Request',
    });

  try {
    const tenant = await prisma.tenant.delete({
      where: { id: tenantId },
    });

    return Response.json(tenant);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(error, {
        status: 500,
        statusText: error.message,
      });
    }
  }
}
