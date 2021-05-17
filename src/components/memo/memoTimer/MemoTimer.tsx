import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectCountDownTimer } from "../../../features/memo/memoSlice";
import { countDownTimer } from "../../../features/memo/operation";
import styles from "./MemoTimer.module.scss";

const MemoTimer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const timer = useSelector(selectCountDownTimer);
  const count = timer.count;
  const isStart = timer.isStart;

  useEffect(() => {
    if (isStart) {
      dispatch(countDownTimer(60));
    }
  }, [isStart, dispatch]);

  return (
    <div>
      <div>
        残り: <span className={styles.count}>{count}</span>秒
      </div>
    </div>
  );
};

export default MemoTimer;
