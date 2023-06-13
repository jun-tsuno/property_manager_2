import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface User {
	userName: string;
	email: string;
	password: string;
}

export async function POST(req: Request) {
	try {
		const { userName, email, password } = (await req.json()) as User;
		const hashed_pass = await hash(password, 12);

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
				{ status: 500 }
			);
		}
	}
}
