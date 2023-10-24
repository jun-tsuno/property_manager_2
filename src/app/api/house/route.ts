import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { houseName, location } = await req.json();

  try {
    if (!session) {
      throw new Error('Not Authorized');
    }

    const ownerId = session?.user.ownerId;

    const house = await prisma.house.create({
      data: {
        houseName: houseName,
        location: location,
        ownerId: ownerId!,
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
