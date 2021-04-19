import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSignedIn } from "./features/authentication/authenticationSlice";
import { listenAuthState } from "./features/authentication/operation";
import { AppDispatch } from "./app/store";

interface Props {
  children: JSX.Element[] | JSX.Element | React.ReactNode;
}

const Auth: React.FC<Props> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, [isSignedIn, dispatch]);

  return <>{isSignedIn ? <>{children}</> : <></>}</>;
};

export default Auth;
