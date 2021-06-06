import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { logout } from "../../features/authentication/operation";
import { selectIsSignedIn, selectUid } from "../../features/authentication/authenticationSlice";
import { fetchAllMemos } from "../../features/memo/operation";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const isSignedIn = useSelector(selectIsSignedIn);
  const uid = useSelector(selectUid);

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchAllMemos(uid));
    }
  }, [dispatch, isSignedIn, uid]);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => dispatch(logout())}>ログアウト</button>
      <button onClick={() => history.push("/memo")}>メモ作成</button>
    </div>
  );
};

export default Home;
