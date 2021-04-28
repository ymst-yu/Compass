import { AppDispatch } from "../../app/store";
import { auth, db, FirebaseTimestamp } from "../../firebaseConfig";
import { isValidRequiredInput, isValidEmailtFormat } from "../../functions/common";
import { loginAction, signOutAction } from "./authenticationSlice";
import firebase from "firebase/app";

export interface LoginActionState {
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
      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            if (data) {
              const { username, email, role, created_at, updated_at } = data;
              const loginActionState: LoginActionState = {
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
  // validation
  if (!isValidRequiredInput(username, email, password)) {
    alert("未入力の項目があります。");
    return false;
  }
  if (!isValidEmailtFormat(email)) {
    alert("メールアドレスの形式が正しくありません。");
    return false;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const user = res.user;
      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();
        const signUpUserData: LoginActionState = {
          uid: uid,
          username: username,
          email: email,
          role: "user",
          created_at: timestamp,
          updated_at: timestamp,
        };

        db.collection("users")
          .doc(uid)
          .set(signUpUserData)
          .then(() => {
            alert("アカウントが作成されました。");
            window.location.href = "/home";
          })
          .catch((error) => {
            alert("アカウントの作成に失敗しました。お手数ですが、時間を置いてから再度お試しください。");
            console.log(error);
          });
      }
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        alert("既に使用されているメールアドレスです。恐れ入りますが、別のメールアドレスでお試しください。");
        console.log(error);
      } else {
        alert("アカウントの作成に失敗しました。お手数ですが、時間を置いてから再度お試しください。");
        console.log(error);
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
