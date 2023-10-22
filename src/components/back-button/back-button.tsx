import Link from 'next/link';
import { ChevronIcon } from '../icons';

interface BackButtonProps {
  href: string;
  label: string;
  className?: string;
}

const BackButton = ({ href, label, className }: BackButtonProps) => {
  return (
    <>
      <Link
        href={href}
        className={`flex items-center gap-1 hover:underline ${className}`}
      >
        <ChevronIcon className='h-6 w-6' />
        {label}
      </Link>
    </>
  );
};

export default BackButton;
