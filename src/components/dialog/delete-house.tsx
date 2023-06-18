'use client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { api } from '@/lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

interface DialogProps {
  houseId: string;
}

const DeleteHouseDialog = ({ houseId }: DialogProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await api.delete(`/api/house-detail?id=${houseId}`);

      setLoading(false);

      if (res.status === 200) {
        router.push(`/dashboard`);
      } else {
        setError('Something went wrong. Fail to delete.');
      }
    } catch (error) {
      setLoading(false);
      setError('Something went wrong on server. Fail to delete.');
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='ghost'
            className='text-destructive hover:bg-destructive hover:text-white'
          >
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          {!error ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete House?</AlertDialogTitle>
                <AlertDialogDescription>
                  House information will be deleted permanently.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button onClick={handleDelete} disabled={loading}>
                  {loading ? 'Deleting...' : 'Delete House'}
                </Button>
              </AlertDialogFooter>
            </>
          ) : (
            <>
              <h3 className='text-destructive'>{error}</h3>
              <Link href={'/dashboard'}>
                <Button>Back to dashboard</Button>
              </Link>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteHouseDialog;
