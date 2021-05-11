import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectCountDownTimer } from "../../../features/memo/memoSlice";

const MemoTextArea: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const timer = useSelector(selectCountDownTimer);
  const isStart = timer.isStart;

  // 処理の流れ
  // 1) React側は入力欄を弾として、関数を発火すると入力欄が追加されていく形にする
  // 2) 追加された入力欄で入力し、Enter(or Buttonクリック)でstoreに保管される仕組みを作る

  const TextField = (
    <li>
      <input type="text" />
      <button>+</button>
    </li>
  );

  return (
    <div>
      <ul>{TextField}</ul>
    </div>
  );
};

export default MemoTextArea;
