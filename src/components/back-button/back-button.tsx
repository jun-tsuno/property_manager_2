'use client';
import { useRouter } from 'next/navigation';
import BackIcon from '../../../public/svgIcon/back';

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <>
      <div
        className={`w-8 rounded-full border border-black p-1 hover:cursor-pointer hover:bg-light-gray ${className}`}
        onClick={() => router.back()}
      >
        <BackIcon />
      </div>
    </>
  );
};

export default BackButton;
