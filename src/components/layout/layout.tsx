import Header from '../header/Header';

interface LayoutProps {
  children: React.ReactNode;
  noPaddingX?: boolean;
  noPaddingY?: boolean;
}

const Layout = (props: LayoutProps) => {
  const { children, noPaddingX, noPaddingY } = props;

  return (
    <>
      <div className='bg-secondary-light-gray fixed z-50 w-full'>
        <Header />
      </div>
      <main
        className={`mx-auto h-[100vh] ${noPaddingX ? '' : 'px-[calc(5%)]'}
          ${noPaddingY ? '' : 'pb-5 pt-16'}`}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
