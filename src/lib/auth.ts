import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'Sign in with Email and Password',
			credentials: {
				// email: {
				// 	label: 'Email',
				// 	type: 'email',
				// 	placeholder: 'email@example.com',
				// },
				// password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				return {
					id: '1',
					email: 'hoge@gmail.com',
					userName: 'hoge',
				};
			},
		}),
	],
};
