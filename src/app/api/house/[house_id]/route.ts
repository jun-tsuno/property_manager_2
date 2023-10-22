import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';

export async function GET(
  req: Request,
  { params }: { params: { house_id: string } },
) {
  const session = await getServerSession(authOptions);
  const houseId = params.house_id;

  try {
    if (!session) {
      throw new Error('Not Authorized');
    }

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
