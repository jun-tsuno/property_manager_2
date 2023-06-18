'use client';
import { useRouter } from 'next/navigation';
import BackIcon from '../../../public/svgIcon/back';

interface BackButtonProps {
  to: string;
  className?: string;
}

const BackButton = ({ to, className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <>
      <div
        className={`w-8 rounded-full border border-black p-1 hover:cursor-pointer hover:bg-light-gray ${className}`}
        onClick={() => router.push(to)}
      >
        <BackIcon />
      </div>
    </>
  );
};

export default BackButton;
