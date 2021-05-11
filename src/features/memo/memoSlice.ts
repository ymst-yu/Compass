import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { MemoType } from "./types";

interface InitialState {
  list: Array<MemoType>;
  memo: MemoType;
  countDownTimer: {
    isStart: boolean;
    count: number;
  };
  isOpenSelectTagMenu: boolean;
  isOpenCreateTagMenu: boolean;
}

const initialState: InitialState = {
  list: [],
  memo: {
    created_at: "",
    title: "",
    texts: [],
    tags: [],
  },
  countDownTimer: {
    isStart: false,
    count: 60,
  },
  isOpenSelectTagMenu: false,
  isOpenCreateTagMenu: false,
};

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemoList: (state, action) => {
      state.list = action.payload;
    },
    setTitle: (state, action) => {
      state.memo.title = action.payload;
    },
    setText: (state, action) => {
      state.memo.texts = [...state.memo.texts, action.payload];
    },
    startTimer: (state, action) => {
      state.countDownTimer.isStart = action.payload;
    },
    countDown: (state, action) => {
      state.countDownTimer.count -= action.payload;
    },
    resetCount: (state, action) => {
      state.countDownTimer.count = action.payload;
    },
    // handleTimerStart
    // handleTagMenuOpen
    // handleCreateTagMenuOpen
  },
});

// Actions
export const { setMemoList, setTitle, setText, startTimer, countDown, resetCount } = memoSlice.actions;

// Selectors
export const selectMemos = (state: RootState): InitialState["list"] => state.memo.list;
export const selectMemo = (state: RootState): InitialState["memo"] => state.memo.memo;
export const selectCountDownTimer = (state: RootState): InitialState["countDownTimer"] => state.memo.countDownTimer;

export default memoSlice.reducer;
