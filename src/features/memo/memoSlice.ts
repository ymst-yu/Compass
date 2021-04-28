import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { auth, db } from "../../firebaseConfig";

interface InitialState {
  list: {
    id: string;
    created_at: string;
    title: string;
    texts: {
      id: string;
      text: string;
    }[];
    tags: string[];
  }[];
  isTimerStart: boolean;
  isTagMenuOpen: boolean;
  isCreateTagMenuOpen: boolean;
}

const initialState: InitialState = {
  list: [],
  isTimerStart: false,
  isTagMenuOpen: false,
  isCreateTagMenuOpen: false,
};

export const fetchAllMemos = createAsyncThunk("memo/fetchAllMemos", async () => {
  const user = await auth.currentUser;
  const uid = user?.uid;
  console.log("uid: ", uid);
  const snapshot = await db.collection("users").doc(uid).collection("memos").orderBy("created_at", "desc").get();
  const allMemos = snapshot.docs.map((doc) => ({
    created_at: doc.data().created_at.toDate().toString(),
    id: doc.data().id,
    title: doc.data().title,
    texts: doc.data().texts,
    tags: doc.data().tags,
  }));
  return allMemos;
});

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    // handleTimerStart
    // handleTagMenuOpen
    // handleCreateTagMenuOpen
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMemos.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const selectMemos = (state: RootState): InitialState["list"] => state.memo.list;

export default memoSlice.reducer;
