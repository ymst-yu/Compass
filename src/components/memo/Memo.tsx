import React from "react";
import styles from "./Memo.module.scss";

import { NowDate } from "../UIKit";
import MemoTitle from "./memoTitle/MemoTitle";
import MemoTextContainer from "./memoTextContainer/MemoTextContainer";
import MemoTimer from "./memoTimer/MemoTimer";
import MemoModal from "./memoModal/MemoModal";

// Material-UI
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Memo: React.FC = () => {
  return (
    <div className={styles.container}>
      <IconButton aria-label="back to main" component="span" size="small" onClick={() => window.history.back()}>
        <ArrowBackIcon />
      </IconButton>
      <NowDate />
      <MemoTimer />
      <MemoTitle />
      <MemoTextContainer />
      <MemoModal />
    </div>
  );
};

export default Memo;
