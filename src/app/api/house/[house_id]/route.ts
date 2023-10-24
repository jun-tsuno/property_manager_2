import { prisma } from '@/lib/prisma';
import { checkAuthentication } from '@/utils/check-auth';

export async function GET(
  req: Request,
  { params }: { params: { house_id: string } },
) {
  const isAuthenticated = await checkAuthentication();
  const houseId = params.house_id;

  if (!isAuthenticated) {
    throw new Error('Not Authorized');
  }

  try {
    const house = await prisma.house.findUnique({
      where: { id: houseId },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            roomId: true,
            fee: true,
            endDate: true,
            houseId: true,
          },
        },
      },
    });

    return Response.json(house);
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

export async function DELETE(
  req: Request,
  { params }: { params: { house_id: string } },
) {
  const isAuthenticated = await checkAuthentication();
  const houseId = params.house_id;

  if (!isAuthenticated) {
    throw new Error('Not Authorized');
  }

  try {
    const house = await prisma.house.delete({
      where: { id: houseId },
    });

    return Response.json(house);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(error, {
        status: 500,
        statusText: error.message,
      });
    }
  }
}
