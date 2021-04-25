import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { signOut } from "../../features/authentication/operation";
import { fetchAllMemos } from "../../features/memo/memoSlice";
// import { fetchAllMemos } from "../../features/memo/operation";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAllMemos());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => dispatch(signOut())}>Sign out</button>
      <button onClick={() => history.push("/memo")}>メモ作成</button>
    </div>
  );
};

export default Home;
