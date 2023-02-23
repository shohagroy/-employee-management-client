import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openNotification: false,
  openMassege: false,
  loading: false,
  notifications: [],
  userBox: true,
  massegeBox: { isOpen: false, receivedBy: {} },
};

const notificationMessageSlice = createSlice({
  name: "getNotification",
  initialState,
  reducers: {
    openNotification: (state) => {
      state.openNotification = !state.openNotification;
      state.openMassege = false;
      state.loading = false;
    },
    openMassege: (state) => {
      state.openNotification = false;
      state.openMassege = !state.openMassege;
      state.loading = false;
    },
    getNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    openMassegeBox: (state, action) => {
      state.massegeBox = {
        ...state.massegeBox,
        isOpen: true,
        receivedBy: action.payload,
      };
      state.openNotification = false;
      state.openMassege = false;
    },
    closeMassegeBox: (state) => {
      state.massegeBox = {
        isOpen: false,
        receivedBy: {},
      };
      state.openNotification = false;
      state.openMassege = false;
    },
  },
});

export const {
  openNotification,
  openMassege,
  getNotifications,
  openMassegeBox,
  closeMassegeBox,
} = notificationMessageSlice.actions;

export default notificationMessageSlice.reducer;
