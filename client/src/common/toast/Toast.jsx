import { toast } from 'sonner';

export const ToastNotification = (toastType, message) => {
  return toast[toastType](message, { duration: 3000 });
};
