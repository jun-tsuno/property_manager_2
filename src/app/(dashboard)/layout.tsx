import Header from '@/components/header/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className='mt-[60px] max-w-[1240px] px-4 md:px-14 lg:mx-auto'>
        {children}
      </div>
    </>
  );
}
