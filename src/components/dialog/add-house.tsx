import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface DialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddHouseDialog = ({ open, setOpen }: DialogProps) => {
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Successfully Added!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Add another house</AlertDialogCancel>
            <Link href={'/dashboard/'}>
              <AlertDialogAction>Back to Dashboard</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddHouseDialog;
