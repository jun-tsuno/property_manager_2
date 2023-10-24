import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  const { userName, email, password } = await req.json();

  try {
    const hashed_pass = await hash(password, 12);
    const existedUser = await prisma.owner.findUnique({
      where: { email: email },
    });

    if (existedUser) {
      throw new Error('User already exist');
    }

    const user = await prisma.owner.create({
      data: {
        name: userName,
        email: email.toLowerCase(),
        password: hashed_pass,
      },
    });

    return Response.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(error, {
        status: 500,
        statusText: error.message,
      });
    }
  }
}
