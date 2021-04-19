import React from "react";
import { signOut } from "../../features/authentication/operation";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => dispatch(signOut())}>Sign out</button>
    </div>
  );
};

export default Home;
