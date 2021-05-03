import { AppDispatch } from "../../app/store";
import { auth, db, FirebaseTimestamp } from "../../firebaseConfig";
import { isValidRequiredInput, isValidEmailtFormat } from "../../functions/common";
import { loginAction, signOutAction } from "./authenticationSlice";
import firebase from "firebase/app";

export interface UserState {
  uid: string;
  username: string;
  email: string;
  role: string;
  created_at: firebase.firestore.Timestamp;
  updated_at: firebase.firestore.Timestamp;
}

export interface LoginUserState {
  updated_at: firebase.firestore.Timestamp;
}

/** ===================
 * Listen Auth State
 ==================== */
export const listenAuthState = () => {
  return async (dispatch: AppDispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user && !user.emailVerified) {
        auth.signOut();
        window.location.href = "/";
      } else if (user && user.emailVerified) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            if (data) {
              const { username, email, role, created_at, updated_at } = data;
              const loginActionState: UserState = {
                uid: uid,
                username: username,
                email: email,
                role: role,
                created_at: created_at.toDate().toString(),
                updated_at: updated_at.toDate().toString(),
              };
              dispatch(loginAction(loginActionState));
            }
          });
      } else {
        window.location.href = "/";
      }
    });
  };
};

/** ===========
 * Sign up
============= */
export const signUp = (username: string, email: string, password: string): boolean | void => {
  // 入力値のチェック =================
  if (!isValidRequiredInput(username, email, password)) {
    alert("未入力の項目があります。");
    return false;
  }
  if (!isValidEmailtFormat(email)) {
    alert("メールアドレスの形式が正しくありません。");
    return false;
  }
  if (password.length < 8) {
    alert("パスワードは８文字以上で設定してください。"); // 後で半角英数字も含むバリデーションを設置する
    return false;
  }

  // メールアドレスの登録状況の確認 ====================
  auth.fetchSignInMethodsForEmail(email).then((res) => {
    if (0 < res.length) {
      // 既に登録されている場合
      alert("既に使用されているメールアドレスです。恐れ入りますが、別のメールアドレスをご利用ください。");
      return false;
    } else {
      // まだ登録されていない場合
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          // アカウントの作成が成功
          const currentUser = result.user;
          if (currentUser) {
            currentUser
              .sendEmailVerification()
              .then(() => {
                // 認証メール送信に成功
                // firestoreにユーザーデータを登録
                const uid = currentUser.uid;
                const timestamp = FirebaseTimestamp.now();
                const createUserData: UserState = {
                  uid: uid,
                  username: username,
                  email: email,
                  role: "user",
                  created_at: timestamp,
                  updated_at: timestamp,
                };
                db.collection("users")
                  .doc(uid)
                  .set(createUserData)
                  .then(() => {
                    // この時点ではメールアドレスの所有権が確認されていないため、
                    // 強制的にサインアウトさせる。（サービスの利用はできない）
                    alert("認証メールを送信しました。案内に沿って認証を完了してください。");
                    auth.signOut();
                  });
              })
              .catch((error) => {
                // 認証メール送信エラー
                console.log("Firebase Error errorCode: ", error.code);
                console.log("Firebase Error errorMessage: ", error.message);
                alert("認証メールの送信に失敗しました。恐れ入りますが、時間をおいて再度お試しください。");
              });
          }
        })
        .catch((error) => {
          // アカウント作成の処理でエラー
          console.log("Firebase Error errorCode: ", error.code);
          console.log("Firebase Error errorMessage: ", error.message);
          alert("処理中にエラーが発生しました。恐れ入りますが、時間をおいて再度お試しください。");
        });
    }
  });
};

/** ==============
 * Login
 =============== */
export const login = (email: string, password: string) => {
  return async (): Promise<boolean | void> => {
    if (!isValidRequiredInput(email, password)) {
      alert("メールアドレスまたはパスワードが正しくありません。");
      return false;
    }
    auth.signInWithEmailAndPassword(email, password).then(async (res) => {
      const user = res.user;
      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();
        const signInUserData: LoginUserState = {
          updated_at: timestamp,
        };
        await db.collection("users").doc(uid).set(signInUserData, { merge: true });
        alert("ログインに成功しました。");
        window.location.href = "/home";
      }
    });
  };
};

/** ==============
 * Sign out
 =============== */
export const signOut = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    auth
      .signOut()
      .then(async () => {
        await dispatch(signOutAction());
        alert("ログアウトしました。");
      })
      .catch((error) => {
        alert("ログアウトに失敗しました。");
        console.log(error);
      });
  };
};

/** ==============
 * Password reset
 ================ */
export const passwordReset = (email: string) => {
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
