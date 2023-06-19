'use client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { api } from '@/lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

interface DialogProps {
  tenantId: string;
  hasPaid: boolean;
}

const PaymentDialog = ({ tenantId, hasPaid }: DialogProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const addRecord = async () => {
    try {
      setLoading(true);

      const res = await api.put(`/api/payment`, { tenantId });

      setLoading(false);

      if (res.status === 200) {
        router.refresh();
        setOpen(false);
      } else {
        setError('Something went wrong. Fail to delete.');
      }
    } catch (error) {
      setLoading(false);
      setError('Something went wrong on server. Fail to delete.');
    }
  };

  const deleteRecord = async () => {
    try {
      setLoading(true);

      const res = await api.delete(`/api/payment?id=${tenantId}`);

      setLoading(false);

      if (res.status === 200) {
        router.refresh();
        setOpen(false);
      } else {
        setError('Something went wrong. Fail to delete.');
      }
    } catch (error) {
      setError('Something went wrong on server. Fail to delete.');
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <Button className='px-1 py-0 text-sm' onClick={() => setOpen(true)}>
          Update
        </Button>
        <AlertDialogContent>
          {!error ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Payment Status</AlertDialogTitle>
                <AlertDialogDescription>
                  Change payment status from{' '}
                  <span className='font-bold text-destructive'>
                    {hasPaid ? 'Paid' : 'Unpaid'} to{' '}
                    {hasPaid ? 'Unpaid' : 'Paid'}
                  </span>{' '}
                  ?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                {hasPaid ? (
                  <Button onClick={deleteRecord}>
                    {loading ? 'Updating...' : 'Update'}
                  </Button>
                ) : (
                  <Button onClick={addRecord}>
                    {loading ? 'Updating...' : 'Update'}
                  </Button>
                )}
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

export default PaymentDialog;
