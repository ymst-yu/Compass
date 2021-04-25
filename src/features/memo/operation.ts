import { auth, db, FirebaseTimestamp } from "../../firebaseConfig";

interface inputNewMemoState {
  title: string;
  texts: {
    id: string;
    text: string;
  }[];
  tags: string[];
}

/** ================
 * createMemo
================== */
export const createMemo = async (inputNewMemo: inputNewMemoState): Promise<void> => {
  try {
    const user = await auth.currentUser;
    if (user) {
      const { title, texts, tags } = inputNewMemo;
      const uid = user.uid;
      const timestamp = FirebaseTimestamp.now();
      const newMemo = {
        created_at: timestamp,
        title: title,
        texts: texts,
        tags: tags,
      };
      await db
        .collection("users")
        .doc(uid)
        .collection("memos")
        .doc()
        .set(newMemo)
        .then(() => {
          alert("新しいメモが登録されました。");
        });
    }
  } catch (error) {
    alert("メモの登録に失敗しました。");
    console.log("Error writing document: ", error);
  }
};

/** ================
 * deleteMemo
================== */
// export const deleteMemo = () => {}
