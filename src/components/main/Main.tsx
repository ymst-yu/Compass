import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";

// authenticationSlice
import { selectUid } from "../../features/authentication/authenticationSlice";
import { logout } from "../../features/authentication/operation";
// memoSlice
import { selectMemos } from "../../features/memo/memoSlice";
import { fetchAllMemos } from "../../features/memo/operation";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const uid = useSelector(selectUid);
  const memos = useSelector(selectMemos);

  useEffect(() => {
    dispatch(fetchAllMemos(uid));
  }, [uid, dispatch]);

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => dispatch(logout())}>ログアウト</button>
      <button onClick={() => (window.location.href = "/memo")}>メモ作成</button>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <dl>
              <dt>{memo.title}</dt>
              <dd>
                <ul>
                  {memo.texts.map((text) => (
                    <li key={text.id}>{text.text}</li>
                  ))}
                </ul>
              </dd>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
