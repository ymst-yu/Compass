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
  isModalOpen: boolean;
}

const initialState: InitialState = {
  list: [],
  memo: {
    id: "",
    created_at: "",
    title: "",
    texts: [],
    tags: [],
  },
  countDownTimer: {
    isStart: false,
    count: 10,
  },
  isOpenSelectTagMenu: false,
  isOpenCreateTagMenu: false,
  isModalOpen: false,
};

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemoList: (state, action) => {
      state.list = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.memo.created_at = action.payload;
    },
    setTitle: (state, action) => {
      state.memo.title = action.payload;
    },
    setTexts: (state, action) => {
      state.memo.texts = action.payload;
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
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    // handleTagMenuOpen
    // handleCreateTagMenuOpen
  },
});

// Actions
export const { setMemoList, setCreatedAt, setTitle, setTexts, startTimer, countDown, resetCount, handleModalOpen } =
  memoSlice.actions;

// Selectors
export const selectMemos = (state: RootState): InitialState["list"] => state.memo.list;
export const selectMemo = (state: RootState): InitialState["memo"] => state.memo.memo;
export const selectModal = (state: RootState): InitialState["isModalOpen"] => state.memo.isModalOpen;
export const selectCountDownTimer = (state: RootState): InitialState["countDownTimer"] => state.memo.countDownTimer;

export default memoSlice.reducer;
