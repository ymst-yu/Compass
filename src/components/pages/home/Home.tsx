import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../../app/store";
import { signOut } from "../../../features/authentication/operation";
import { selectIsSignedIn } from "../../../features/authentication/authenticationSlice";
import { selectMemos, fetchAllMemos } from "../../../features/memo/memoSlice";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const memos = useSelector(selectMemos);
  const isSignedIn = useSelector(selectIsSignedIn);

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchAllMemos());
    }
  }, [dispatch, isSignedIn]);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => dispatch(signOut())}>Sign out</button>
      <button onClick={() => history.push("/memo")}>メモ作成</button>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <h2>{memo.title}</h2>
            <ul>
              {memo.texts.map((text) => (
                <li key={text.id}>{text.text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
