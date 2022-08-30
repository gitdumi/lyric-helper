import { Alert, Snackbar } from '@mui/material';
import React, { useEffect } from 'react';
import { NotificationState, removeNotification } from './notificationSlice';
import { NOTIFICATION_SHOW_DURATION } from '../../../utils/constants';
import { getNewKey } from '../../../utils/utils';
import { useDispatch } from 'react-redux';

const STATUSES = {
  SUCCESS: 'success',
  INFO: 'info',
  ERROR: 'error'
};

export const NOTIFICATIONS = {
  SAVE_SONG: {
    id: `notif-${getNewKey()}`,
    status: STATUSES.SUCCESS,
    message: 'saved it!',
    timestamp: `${new Date()}`
  },
  DELETED: {
    id: `notif-${getNewKey()}`,
    status: STATUSES.SUCCESS,
    message: 'deleted song!',
    timestamp: `${new Date()}`
  }
};

function PopUpMessage(props: { messageDetails: NotificationState }) {
  const dispatch = useDispatch();
  const { messageDetails } = props;
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      dispatch(removeNotification(messageDetails.id));
    }, NOTIFICATION_SHOW_DURATION);
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    console.log('closing');
    if (reason === 'clickaway') {
      return;
    }
    dispatch(removeNotification(messageDetails.id));
    setOpen(false);
  };

  return (
    <Snackbar
      className="pop-up-message"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
    >
      {/*// @ts-ignore*/}
      <Alert onClose={handleClose} severity={messageDetails.status}>
        {messageDetails.message}
      </Alert>
    </Snackbar>
  );
}

export default PopUpMessage;
