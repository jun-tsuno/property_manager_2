import Link from 'next/link';
import House from '../../../public/svgIcon/house';

interface HouseCardProps {
  houseId: string;
  houseName: string;
  location: string;
}

const HouseCard = ({ houseId, houseName, location }: HouseCardProps) => {
  return (
    <>
      <Link
        href={`/dashboard/${houseId}`}
        className='relative aspect-video w-[90%] max-w-[360px] cursor-pointer shadow-md shadow-slate-400 hover:border-2 hover:border-gradient-var4 hover:brightness-90'
      >
        <House />
        <div className='absolute bottom-0 right-1/2 w-full translate-x-1/2 bg-black/40 py-3 text-center text-white backdrop-blur-md'>
          <p className='text-xl'>{houseName}</p>
          <p>{location}</p>
        </div>
      </Link>
    </>
  );
};

export default HouseCard;
