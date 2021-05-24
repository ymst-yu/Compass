import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { InitialState } from "./types";

const initialState: InitialState = {
  isAlert: false,
  loading: {
    state: false,
    text: "",
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showAlertAction: (state, action) => {},
    hideAlertAction: (state, action) => {},
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
export const { showLoadingAction, hideLoadingAction } = notificationSlice.actions;

// Selectors
export const selectIsAlert = (state: RootState): InitialState["isAlert"] => state.notification.isAlert;
export const selectLoading = (state: RootState): InitialState["loading"] => state.notification.loading;

export default notificationSlice.reducer;
