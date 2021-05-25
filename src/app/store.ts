import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authenticationSliceReducer from "../features/authentication/authenticationSlice";
import memoSliceReducer from "../features/memo/memoSlice";
import notificationSliceReducer from "../features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSliceReducer,
    memo: memoSliceReducer,
    notification: notificationSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
