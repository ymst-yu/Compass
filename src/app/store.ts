import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import memoSliceReducer from "../features/memo/memoSlice";

export const store = configureStore({
  reducer: {
    user: authenticationReducer,
    memo: memoSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
