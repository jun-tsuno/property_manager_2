import { HouseIllustration } from '@/components/icons/index';
import Link from 'next/link';

interface HouseCardProps {
  houseId: string;
  houseName: string;
  location: string;
}

const HouseCard = ({ houseId, houseName, location }: HouseCardProps) => {
  return (
    <>
      <Link
        href='#'
        className='relative w-[90%] min-w-[250px] max-w-[280px] rounded-md bg-white shadow-md shadow-black/30 hover:cursor-pointer hover:border-2 hover:border-gradient-var4'
      >
        <HouseIllustration />
        <div className='absolute bottom-0 right-1/2 w-full translate-x-1/2 bg-black/40 py-3 text-center text-white backdrop-blur-md'>
          <p className='text-xl'>{houseName}</p>
          <p>{location}</p>
        </div>
      </Link>
    </>
  );
};

export default HouseCard;
