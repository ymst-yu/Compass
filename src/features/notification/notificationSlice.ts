import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { InitialState } from "./types";

const initialState: InitialState = {
  alert: {
    state: false,
  },
  loading: {
    state: false,
    text: "",
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showAlertAction: (state) => {
      state.alert.state = true;
    },
    showLoadingAction: (state, action) => {
      state.loading.state = true;
      state.loading.text = action.payload;
    },
    hideLoadingAction: (state) => {
      state.loading.state = false;
      state.loading.text = initialState.loading.text;
    },
  },
});

// Actions
export const { showAlertAction, showLoadingAction, hideLoadingAction } = notificationSlice.actions;

// Selectors
export const selectAlert = (state: RootState): InitialState["alert"] => state.notification.alert;
export const selectLoading = (state: RootState): InitialState["loading"] => state.notification.loading;

export default notificationSlice.reducer;
