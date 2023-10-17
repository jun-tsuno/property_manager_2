import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      throw new Error('Not Authorized');
    }

    const ownerId = session?.user?.ownerId;
    const houses = await prisma.house.findMany({
      where: {
        ownerId,
      },
    });

    return Response.json(houses);
  } catch (error: any) {
    console.log(error);
    return Response.json(error, {
      status: 500,
      statusText: error.message,
    });
  }
}
