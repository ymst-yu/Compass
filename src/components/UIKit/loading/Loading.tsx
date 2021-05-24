import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { selectLoading } from "../../../features/notification/notificationSlice";
import styles from "./Loading.module.scss";
import { Typography } from "@material-ui/core";

interface Props {
  children: JSX.Element[] | JSX.Element | React.ReactNode;
}

const Loading: React.FC<Props> = ({ children }) => {
  const loadingState = useSelector(selectLoading);
  const isLoading = loadingState.state;
  const loadingText = loadingState.text;
  return (
    <>
      {isLoading && (
        <div className={styles.container}>
          <CircularProgress />
          <Typography component="p" variant="body2">
            {loadingText}
          </Typography>
        </div>
      )}
      {children}
    </>
  );
};

export default Loading;
