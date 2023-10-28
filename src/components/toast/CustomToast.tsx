import { toast, ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successToast = (message: string) =>
  toast.success(message, {
    style: {
      borderRadius: '4px',
      padding: '8',
      background: '#10172A',
      color: '#FFFFFF',
    },
  });

export const errorToast = (message: string) =>
  toast.error(message, {
    style: {
      borderRadius: '4px',
      padding: '8',
      background: '#10172A',
      color: '#FFFFFF',
    },
  });

interface ToastProps {
  position?: ToastPosition;
}

const CustomToast = ({ position = 'top-right' }: ToastProps) => {
  return (
    <>
      <ToastContainer
        position={position}
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
};

export default CustomToast;
