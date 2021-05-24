import { auth, db, FirebaseTimestamp } from "../../firebaseConfig";
import { AppDispatch } from "../../app/store";
import { InitialState } from "./types";
import { loginAction } from "./authenticationSlice";

// ==================================================================
// ログイン時間の更新 & ログイン中のユーザーデータをStoreにセットする関数
export const setLoggingInState = (uid: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const userRef = await db.collection("users").doc(uid);
    userRef
      .get()
      .then(async (snapshot) => {
        const data = snapshot.data(); // Reduxで扱える形にレスポンスを整形
        if (data) {
          const { username, email, role, created_at } = data;
          const timestamp = FirebaseTimestamp.now();
          const updateLoginTime = {
            updated_at: timestamp,
          };

          // Firestore上のログイン時間を更新
          await userRef.set(updateLoginTime, { merge: true });

          // Storeにセットするstateを作成
          const loginActionState: InitialState = {
            isSignedIn: true,
            uid: uid,
            username: username,
            email: email,
            role: role,
            created_at: created_at.toDate().toString(),
            updated_at: timestamp.toDate().toString(),
          };
          // ログイン状態を更新
          dispatch(loginAction(loginActionState));
        }
      })
      .catch((error) => {
        console.log("Firebase Error errorCode: ", error.code);
        console.log("Firebase Error errorMessage: ", error.message);
      });
  };
};

// ==================================================================
// 認証メールを送信する関数
export const sendEmailVerification = async (): Promise<void> => {
  const currentUser = await auth.currentUser;
  if (currentUser) {
    // メールに記載のリンクURLをログインページに設定
    // （認証完了後すぐログインできるように）
    const actionCodeSettings = {
      url: "https://compass-demo-7527f.web.app/login",
      handleCodeInApp: true,
    };
    currentUser
      // 認証メール送信
      .sendEmailVerification(actionCodeSettings)
      .then(() => {
        // 送信成功
        alert("認証メールを送信しました。");
      })
      .catch((error) => {
        // 送信失敗
        alert("認証メールの送信に失敗しました。お手数ですが、お時間を置いて再度お試しください。");
        console.log("Firebase Error errorCode: ", error.code);
        console.log("Firebase Error errorMessage: ", error.message);
      });
  } else {
    alert("ユーザーが存在しません。");
  }
};
