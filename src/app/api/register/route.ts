import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

interface UserArg {
  userName: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { userName, email, password } = (await req.json()) as UserArg;
    const hashed_pass = await hash(password, 12);

    const userExist = await prisma.owner.findUnique({
      where: { email: email },
    });

    if (userExist) {
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          message: 'User already exist',
        }),
        { status: 400 },
      );
    }

    const user = await prisma.owner.create({
      data: {
        name: userName,
        email: email.toLowerCase(),
        password: hashed_pass,
      },
    });

    return NextResponse.json({
      user: { userName: user.name, email: user.email },
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
