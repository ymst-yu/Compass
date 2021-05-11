import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { InitialState } from "./types";

const initialState: InitialState = {
  isSignedIn: false,
  uid: "",
  username: "",
  email: "",
  role: "",
  created_at: "",
  updated_at: "",
};

// Slice
export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.isSignedIn = true;
      state.uid = action.payload.uid;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
    },
    logoutAction: () => {
      return {
        ...initialState,
      };
    },
  },
});

// Actions
export const { loginAction, logoutAction } = authenticationSlice.actions;

// Selectors
export const selectIsSignedIn = (state: RootState): InitialState["isSignedIn"] => state.user.isSignedIn;
export const selectUid = (state: RootState): InitialState["uid"] => state.user.uid;

export default authenticationSlice.reducer;
