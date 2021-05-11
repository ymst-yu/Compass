/** 関数一覧
 * 認証状態を取得
 * 認証メールを送信
 * サインアップ
 * ログイン
 * ログアウト
 * パスワードリセット
 */

import { AppDispatch } from "../../app/store";
import { auth, db, FirebaseTimestamp } from "../../firebaseConfig";
import { isValidRequiredInput, isValidEmailtFormat } from "../../functions/common";
import { logoutAction } from "./authenticationSlice";
import { setLoggingInState, sendEmailVerification } from "./util";
import { LoginUserData } from "./types";

// ===================================================================
// 現在のログイン状態を取得し、
// その状態に応じてログインが必要なサービスの利用を許可するか・しないか決定する
export const listenAuthState = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // ログイン中のユーザー情報をstateにセットする（全てのサービスが利用できる）
        const uid = user.uid;
        dispatch(setLoggingInState(uid));
      } else {
        // ホーム画面に強制的に遷移させる（ログインが必要なサービスは利用できない）
        window.location.href = "/";
      }
    });
  };
};

// ===================================================================
// サインアップ
export const signUp = async (username: string, email: string, password: string): Promise<boolean | void> => {
  // 入力値のチェック
  if (!isValidRequiredInput(username, email, password)) {
    alert("未入力の項目があります。");
    return false;
  }
  if (!isValidEmailtFormat(email)) {
    alert("メールアドレスの形式が正しくありません。");
    return false;
  }
  if (password.length < 8) {
    alert("パスワードは８文字以上で設定してください。"); // TODO:半角英数字も含むバリデーションを設置する
    return false;
  }
  // メールアドレスの登録状況の確認
  const isUsedEmail = await auth.fetchSignInMethodsForEmail(email).then((res) => res.length);
  if (isUsedEmail > 0) {
    alert("既に使用されているメールアドレスです。恐れ入りますが、別のメールアドレスをご利用ください。");
    return false;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      // アカウントの作成に成功
      const currentUser = result.user;
      if (currentUser) {
        // 認証メールを送信
        sendEmailVerification().then(() => {
          const uid = currentUser.uid;
          const userRef = db.collection("users").doc(uid);

          // firestoreに新規ユーザーデータを登録
          // （1度でも認証メールを送信している場合はユーザーデータが作成されているため、この処理は実行されない）
          userRef
            .get()
            .then((doc) => {
              // doc(uid)が存在しない場合
              if (!doc.exists) {
                const timestamp = FirebaseTimestamp.now();
                // ユーザーデータを作成
                const userData: LoginUserData = {
                  uid: uid,
                  username: username,
                  email: email,
                  role: "user",
                  created_at: timestamp,
                  updated_at: timestamp,
                };
                userRef.set(userData).then(() => {
                  // この時点ではメールアドレスの所有権が確認されていないため、
                  // 強制的にサインアウトさせる（サービスの利用はできない）
                  auth.signOut();
                });
              }
            })
            .catch((error) => {
              // doc取得の処理でエラー
              console.log("Firebase Error errorCode: ", error.code);
              console.log("Firebase Error errorMessage: ", error.message);
              alert("処理中にエラーが発生しました。恐れ入りますが、お時間をおいてから再度お試しください。");
            });
        });
      }
    })
    .catch((error) => {
      // アカウント作成の処理でエラー
      console.log("Firebase Error errorCode: ", error.code);
      console.log("Firebase Error errorMessage: ", error.message);
      alert("処理中にエラーが発生しました。恐れ入りますが、お時間をおいてから再度お試しください。");
    });
};

// ===================================================================
// ログイン
export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatch): Promise<boolean | void> => {
    if (!isValidRequiredInput(email, password)) {
      alert("メールアドレスまたはパスワードが正しくありません。");
      return false;
    }
    auth.signInWithEmailAndPassword(email, password).then(async (res) => {
      const user = res.user;
      if (user && user.emailVerified) {
        const uid = user.uid;
        await dispatch(setLoggingInState(uid));
        window.location.href = "/home";
        alert("ログインに成功しました");
      } else {
        // メールアドレスの認証が済んでいない場合は認証ページへ遷移させる
        window.location.href = "/authentication/email";
      }
    });
  };
};

// ===================================================================
// ログアウト
export const logout = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    auth
      .signOut()
      .then(async () => {
        await dispatch(logoutAction());
        alert("ログアウトしました。");
      })
      .catch((error) => {
        alert("ログアウトに失敗しました。");
        console.log(error);
      });
  };
};

// ===================================================================
// パスワードリセット
export const resetPassword = (email: string) => {
  return async (): Promise<boolean | void> => {
    if (!isValidEmailtFormat(email)) {
      alert("メールアドレスが正しくありません。");
      return false;
    }
    await auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("ご指定のメールアドレスにパスワードリセットのメールを送信しました。");
      })
      .catch((error) => {
        alert("登録されていないメールアドレスです。ご確認の上、再度お試しください。");
        console.log(error);
      });
  };
};
