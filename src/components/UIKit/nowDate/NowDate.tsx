import React, { useEffect } from "react";
import { generateNowDateString } from "../../../functions/common";
import { setCreatedAt } from "../../../features/memo/memoSlice";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";

const NowDate: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const date = generateNowDateString();
  useEffect(() => {
    dispatch(setCreatedAt(date));
  }, [dispatch, date]);

  return (
    <div>
      <div>{date}</div>
    </div>
  );
};

export default NowDate;
