import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Notif = ({ flash, errors, duration = 3000 }) => {
 if (!flash && !errors) return null;
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    if (flash?.success) {
      Toast.fire({
        icon: 'success',
        title: flash.success,
      });
    }

    if (flash?.error) {
      Toast.fire({
        icon: 'error',
        title: flash.error,
      });
    }

    if (Object.keys(errors || {}).length > 0) {
      const errorMessages = Object.values(errors)
        .filter((error) => error)
        .join(', ');

      Toast.fire({
        icon: 'error',
        title: errorMessages || 'An error occurred',
      });
    }
  }, [flash, errors, Toast, duration]);

  return null;
};

export default Notif;
