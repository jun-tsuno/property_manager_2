import { HouseIllustration } from '@/components/icons/index';
import { ButtonHTMLAttributes } from 'react';

interface HouseCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  houseName: string;
  location: string;
  isSelected: boolean;
}

const HouseCard = ({
  houseName,
  location,
  isSelected,
  ...rest
}: HouseCardProps) => {
  return (
    <>
      <button
        className={`relative w-[90%] min-w-[250px] max-w-[280px] rounded-md bg-white shadow-md shadow-black/30 ${
          isSelected
            ? 'border-[4px] border-violet-500'
            : 'hover:border-2 hover:border-slate-200'
        }`}
        {...rest}
      >
        <HouseIllustration />
        <div className='absolute bottom-0 right-1/2 w-full translate-x-1/2 bg-black/40 py-3 text-center text-white backdrop-blur-md'>
          <p className='text-xl'>{houseName}</p>
          <p>{location}</p>
        </div>
      </button>
    </>
  );
};

export default HouseCard;
