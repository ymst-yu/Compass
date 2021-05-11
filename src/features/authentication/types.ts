import firebase from "firebase/app";

export interface InitialState {
  isSignedIn: boolean;
  uid: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

// firestoreにデータをセットする際の型
export interface LoginUserData {
  uid: string;
  username: string;
  email: string;
  role: string;
  created_at: firebase.firestore.Timestamp;
  updated_at: firebase.firestore.Timestamp;
}
