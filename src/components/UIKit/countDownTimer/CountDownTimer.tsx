import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectCountDownTimer } from "../../../features/memo/memoSlice";
import { countDownTimer } from "../../../features/memo/operation";
import styles from "./CountDownTimer.module.scss";

const CountDownTimer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const timer = useSelector(selectCountDownTimer);
  const isStart = timer.isStart;

  useEffect(() => {
    if (isStart) {
      dispatch(countDownTimer(60));
    }
  }, [isStart, dispatch]);

  return (
    <div>
      <div>
        残り: <span className={styles.count}>{timer.count}</span>秒
      </div>
    </div>
  );
};

export default CountDownTimer;
