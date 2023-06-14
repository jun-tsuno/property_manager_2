import Header from '../header/header';

interface LayoutProps {
  children: React.ReactNode;
  noMargin?: boolean;
  noPadding?: boolean;
}

const Layout = (props: LayoutProps) => {
  const { children, noMargin, noPadding } = props;

  return (
    <>
      <div className='bg-secondary-light-gray fixed w-full z-50'>
        <Header />
      </div>
      <main
        className={`mx-auto h-[100vh] ${noMargin ? '' : 'w-[90%]'}
          ${noPadding ? '' : 'pt-16 pb-5'}`}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
