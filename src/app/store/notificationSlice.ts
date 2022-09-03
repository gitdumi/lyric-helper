import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface NotificationState {
  id: string;
  status: string;
  message: string;
  timestamp: Date;
}

const initialState = [] as NotificationState[];

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      return [...state, action.payload].slice(-3);
    },
    removeNotification: (state, action) => {
      return [...state.filter((notif) => notif.id != action.payload)];
    }
  }
});

export const selectLatestNotification = (state: RootState) => {
  return state.notifications[state.notifications.length - 1];
};

export const selectNotifications = (state: RootState) => state.notifications;

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
