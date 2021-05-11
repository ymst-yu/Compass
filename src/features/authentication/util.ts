import { auth, db, FirebaseTimestamp } from "../../firebaseConfig";
import { AppDispatch } from "../../app/store";
import { InitialState } from "./types";
import { loginAction } from "./authenticationSlice";

// ログイン中のユーザーデータをstateにセットする
export const setLoggingInState = (uid: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const userRef = db.collection("users").doc(uid);
    userRef
      .get()
      .then(async (snapshot) => {
        const data = snapshot.data(); // レスポンスの整形（Reduxで扱える形にする）
        if (data) {
          const { username, email, role, created_at } = data;
          const timestamp = FirebaseTimestamp.now();
          // firesoteにログイン時間を登録
          const updateLoginTime = {
            updated_at: timestamp,
          };
          await userRef.set(updateLoginTime, { merge: true });

          // ログイン中のstateを作成
          const loginActionState: InitialState = {
            isSignedIn: true,
            uid: uid,
            username: username,
            email: email,
            role: role,
            created_at: created_at.toDate().toString(),
            updated_at: timestamp.toDate().toString(),
          };
          // 作成したstateでログイン状態を更新
          dispatch(loginAction(loginActionState));
        }
      })
      .catch((error) => {
        console.log("Firebase Error errorCode: ", error.code);
        console.log("Firebase Error errorMessage: ", error.message);
      });
  };
};

// 認証メールの送信機能
export const sendEmailVerification = async (): Promise<void> => {
  const currentUser = await auth.currentUser;
  if (currentUser) {
    // メールに記載のリンクURLをログインページに設定
    // （認証完了後にすぐログインできるように）
    const actionCodeSettings = {
      url: "https://compass-demo-7527f.web.app/login",
      handleCodeInApp: true,
    };
    currentUser
      // 認証メール送信
      .sendEmailVerification(actionCodeSettings)
      .then(async () => {
        // 送信成功
        alert("認証メールを送信しました。");
      })
      .catch((error) => {
        // 送信失敗
        alert("認証メールの送信に失敗しました。お手数ですが、時間を置いてから再度お試しください。");
        console.log("Firebase Error errorCode: ", error.code);
        console.log("Firebase Error errorMessage: ", error.message);
      });
  } else {
    alert("ユーザーが存在しません。");
  }
};
