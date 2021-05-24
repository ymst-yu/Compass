import { auth, db } from "../../firebaseConfig";
import { AppDispatch } from "../../app/store";
import { startTimer, countDown, resetCount, setMemoList, handleModalOpen } from "./memoSlice";
import { MemoType } from "./types";
import { toast } from "react-toastify";

/**
 * カウントダウンタイマー
 * @param initialSeconds
 * @returns {void}
 */
export const countDownTimer = (initialSeconds: number) => {
  return async (dispatch: AppDispatch) => {
    // 1回の処理で減少するカウント数（setInterval中に使用する）
    const decrementInterval = 1;
    // 現時刻
    let now = new Date();
    // 終了時刻
    const end = new Date(now.getTime() + initialSeconds * 1000);

    // タイマー本体
    // （現時刻 >= 終了時刻 となったら停止する）
    const counter = setInterval(() => {
      dispatch(countDown(decrementInterval));
      if (now.getTime() >= end.getTime()) {
        clearInterval(counter);
        // タイマーを停止
        dispatch(startTimer(false));
        // モーダルをオープン
        dispatch(handleModalOpen(true));
        // カウントを初期値に戻す
        dispatch(resetCount(initialSeconds));
      } else {
        now = new Date();
      }
    }, 1000);
  };
};

/**
 * メモの全件取得
 * (Firestoreからメモを全件取得し、storeに保管する)
 * @param uid (uidと一致するユーザーのメモを取得するため)
 * @returns {void}
 */
export const fetchAllMemos = (uid: string) => {
  return async (dispatch: AppDispatch) => {
    const userRef = db.collection("users").doc(uid);

    // firestoreから全てのメモを取得
    const snapshots = await userRef.collection("memos").orderBy("created_at", "desc").get();

    // toolkitで扱える形に整形
    const memoList = snapshots.docs.map((doc) => ({
      id: doc.id,
      created_at: doc.data().created_at.toDate().toString(),
      title: doc.data().title,
      texts: doc.data().texts,
      tags: doc.data().tags,
    }));

    // storeに保存
    if (memoList) {
      dispatch(setMemoList(memoList));
    }
  };
};

/** ================
 * createMemo
================== */
// メモ作成の流れ
// 1) React側でタイトル、テキスト、日付をもったメモを作成
// 2) dispatch(createMemo(obj(1で作成したメモ)))としてoperation関数に渡す
// 3) createMemoでは、firestoreに登録する
// 4) memoSliceのfetchAllMemosで作成したメモを取得し、storeに保存する
// 5) コンポーネント側でメモを呼び出すときはstoreから取得する
export const saveMemo = (memo: MemoType) => {
  return async (): Promise<void> => {
    const currentUser = await auth.currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      db.collection("users")
        .doc(uid)
        .collection("memos")
        .doc()
        .set(memo)
        .then(() => {
          toast.success("メモが保存されました。");
        });
    }
  };
};

/** ================
 * deleteMemo
================== */
// export const deleteMemo = () => {}
