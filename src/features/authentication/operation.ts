import { AppDispatch } from "../../app/store";
import { auth, db, FirebaseTimestamp } from "../../firebaseConfig";
import { isValidRequiredInput, isValidEmailtFormat } from "../../functions/common";
import { logoutAction } from "./authenticationSlice";
import { setLoggingInState, sendEmailVerification } from "./util";
import { LoginUserData } from "./types";
import { showAlertAction, showLoadingAction, hideLoadingAction } from "../notification/notificationSlice";
import { toast } from "react-toastify";

// ===================================================================
// ユーザーの認証状態に応じてサービスの利用を制限する関数
// (「ログイン中 & メールアドレス認証済み」かどうかチェックする)
export const listenAuthState = () => {
  return async (dispatch: AppDispatch): Promise<void | boolean> => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          const uid = user.uid;
          // ユーザー情報をStoreにセットする（全てのサービスが利用できるようになる）
          dispatch(setLoggingInState(uid));
        } else {
          window.location.href = "/authentication/email/send";
        }
      } else {
        // ログイン画面に強制遷移させる（サービスは利用できない）
        window.location.href = "/login";
      }
    });
  };
};

// ===================================================================
// サインアップ
export const signUp = (inputUsername: string, inputEmail: string, inputPassword: string) => {
  return async (dispatch: AppDispatch): Promise<void | boolean> => {
    // Validations
    if (!isValidRequiredInput(inputUsername, inputEmail, inputPassword)) {
      alert("未入力の項目があります。");
      return false;
    }
    if (!isValidEmailtFormat(inputEmail)) {
      alert("メールアドレスの形式が正しくありません。");
      return false;
    }
    if (inputPassword.length < 8) {
      alert("パスワードは８文字以上で設定してください。"); // TODO:半角英数字も含むバリデーションを設置する
      return false;
    }
    const isAlreadyUsedEmail = await auth.fetchSignInMethodsForEmail(inputEmail).then((res) => res.length);
    if (isAlreadyUsedEmail > 0) {
      alert("既に使用されているメールアドレスです。恐れ入りますが、別のメールアドレスをご利用ください。");
      return false;
    }

    // アカウントの作成処理
    auth
      .createUserWithEmailAndPassword(inputEmail, inputPassword)
      .then((result) => {
        // アカウントの作成に成功
        const currentUser = result.user;
        if (currentUser) {
          // 認証メールを送信
          sendEmailVerification().then(() => {
            const uid = currentUser.uid;
            const userRef = db.collection("users").doc(uid);

            // Firestoreに新規ユーザーデータを登録
            userRef
              .get()
              .then((doc) => {
                if (!doc.exists) {
                  const timestamp = FirebaseTimestamp.now();
                  const userData: LoginUserData = {
                    uid: uid,
                    username: inputUsername,
                    email: inputEmail,
                    role: "user",
                    created_at: timestamp,
                    updated_at: timestamp,
                  };
                  userRef.set(userData).then(() => {
                    window.location.href = "/authentication/email/sent";
                  });
                }
              })
              .catch((error) => {
                // docの取得に失敗
                console.log("Firebase Error errorCode: ", error.code);
                console.log("Firebase Error errorMessage: ", error.message);
                alert("処理中にエラーが発生しました。恐れ入りますが、お時間をおいてから再度お試しください。");
              });
          });
        }
      })
      .catch((error) => {
        // アカウントの作成に失敗
        console.log("Firebase Error errorCode: ", error.code);
        console.log("Firebase Error errorMessage: ", error.message);
        alert("処理中にエラーが発生しました。恐れ入りますが、お時間をおいてから再度お試しください。");
      });
  };
};

// ===================================================================
// ログイン
export const login = (inputEmail: string, inputPassword: string) => {
  return async (dispatch: AppDispatch): Promise<boolean | void> => {
    dispatch(showLoadingAction("ログイン中"));
    if (!isValidRequiredInput(inputEmail, inputPassword)) {
      dispatch(hideLoadingAction());
      alert("メールアドレスまたはパスワードが正しくありません。");
      return false;
    }
    auth
      .signInWithEmailAndPassword(inputEmail, inputPassword)
      .then(async (res) => {
        const user = res.user;
        if (user && user.emailVerified) {
          const uid = user.uid;
          await dispatch(setLoggingInState(uid));
          dispatch(hideLoadingAction());
          dispatch(showAlertAction());
          window.location.href = "/main";
        } else {
          dispatch(hideLoadingAction());
          // メールアドレスが未認証の場合は認証メール送信画面へ遷移させる
          window.location.href = "/authentication/email/send";
        }
      })
      .catch((error) => {
        dispatch(hideLoadingAction());
        console.log(error);
        alert("メールアドレスまたはパスワードが正しくありません。");
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
      })
      .catch((error) => {
        alert("ログアウトに失敗しました。");
        console.log(error);
      });
  };
};

// ===================================================================
// パスワードリセット
export const resetPassword = (inputEmail: string) => {
  return async (): Promise<boolean | void> => {
    if (!isValidEmailtFormat(inputEmail)) {
      alert("メールアドレスが正しくありません。");
      return false;
    }
    await auth
      .sendPasswordResetEmail(inputEmail)
      .then(() => {
        alert("ご指定のメールアドレスにパスワードのリセットメールを送信しました。");
      })
      .catch((error) => {
        alert("登録されていないメールアドレスです。ご確認の上、再度お試しください。");
        console.log(error);
      });
  };
};
