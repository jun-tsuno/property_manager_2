import '@/style/globals.css';
import { Lobster, Montserrat } from 'next/font/google';
import { Provider } from './provider';

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
  title: {
    default: 'Rent',
    template: '%s | Rent',
  },
  description:
    'Manage your properties. Rental house and its tenant management app for house owners.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${lobster.variable} ${montserrat.variable}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
