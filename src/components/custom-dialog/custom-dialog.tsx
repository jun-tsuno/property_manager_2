import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Dispatch, SetStateAction } from 'react';

interface DialogProps {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
  cancelTitle: string;
  actionTitle: string;
  action: () => void;
  trigger?: string;
}

const CustomDialog = (props: DialogProps) => {
  const {
    open,
    setOpen,
    title,
    description,
    cancelTitle,
    actionTitle,
    action,
    trigger,
  } = props;
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {trigger && <AlertDialogTrigger>{trigger}</AlertDialogTrigger>}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{cancelTitle}</AlertDialogCancel>
            <AlertDialogAction onClick={action}>
              {actionTitle}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomDialog;
