import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	const password = await hash('hogehoge!', 10);
	const owner = await prisma.owner.upsert({
		where: { email: 'hoge@example.com' },
		update: {},
		create: {
			name: 'Hoge',
			email: 'hoge@example.com',
			password: password,
		},
	});
	console.log(owner);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
