import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface InitialState {
  id: string;
  created_at: string;
  title: string;
  texts: {
    id: string;
    text: string;
  }[];
  tags: string[];
  isTimerStart: boolean;
  isTagMenuOpen: boolean;
  isCreateTagMenuOpen: boolean;
}

const initialState: InitialState = {
  id: "",
  created_at: "",
  title: "",
  texts: [],
  tags: [],
  isTimerStart: false,
  isTagMenuOpen: false,
  isCreateTagMenuOpen: false,
};

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    /**
     * handleTagMenuOpen
     * handleCreateTagMenuOpen
     * handleTimerStart
     * createMemo
     * editMemo
     * deleteMemo
     */
  },
  extraReducers: (builder) => {
    /**
     * fetchAllMemos
     */
  },
});
