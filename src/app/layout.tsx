import '@/style/globals.css';
import { Lobster, Montserrat } from 'next/font/google';
import { NextAuthProvider } from './provider';

const montserrat = Montserrat({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});
const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lobster',
});

export const metadata = {
  title: 'Rent',
  description: 'Manage your properties - rent management app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${lobster.variable} ${montserrat.variable}`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
