import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { RootState } from '../redux/store';
import { clearAlertMessage } from '../redux/slice/alertSlice';

const AlertMessage: React.FC = () => {
//   const dispatch = useDispatch();
  const dispatch = useDispatch<AppDispatch>();
  const alert = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        dispatch(clearAlertMessage()); // Clear alert after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [alert, dispatch]);

  return (
    <Snackbar
    open={alert.open}
    autoHideDuration={3000}
    onClose={() => dispatch(clearAlertMessage())}
  >
    <Alert
      onClose={() => dispatch(clearAlertMessage())}
      severity={alert.severity || 'info'} // Fallback severity
      variant="filled"
    >
      {alert.message || 'Something went wrong'} {/* Fallback message */}
    </Alert>
  </Snackbar>
  );
};

export default AlertMessage;
