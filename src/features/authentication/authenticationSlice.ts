import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface UserInitialState {
  isSignedIn: boolean;
  uid: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
  updated_at?: string;
}

const initialState: UserInitialState = {
  isSignedIn: false,
  uid: "",
  username: "",
  email: "",
  role: "",
  created_at: "",
  updated_at: "",
};

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
    signOutAction: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { loginAction, signOutAction } = authenticationSlice.actions;

export const selectIsSignedIn = (state: RootState): UserInitialState["isSignedIn"] => state.user.isSignedIn;

export default authenticationSlice.reducer;
