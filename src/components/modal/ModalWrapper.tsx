'use client';
import { CrossIcon } from '../icons';

interface ModalWrapperProps {
  children: JSX.Element;
  className?: string;
  setOpen: (open: boolean) => void;
}

const ModalWrapper = ({ children, className, setOpen }: ModalWrapperProps) => {
  return (
    <>
      <div
        className={`absolute left-1/2 top-1/2 z-[150] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 ${
          className ? className : ''
        }`}
      >
        <div className='text-end'>
          <button
            onClick={() => setOpen(false)}
            className='h-7 w-7 hover:scale-125'
          >
            <CrossIcon />
          </button>
        </div>
        {children}
      </div>

      <div className='fixed left-0 top-0 z-[100] h-[100vh] w-[100vw] bg-[#303e5e]/60' />
    </>
  );
};

export default ModalWrapper;
