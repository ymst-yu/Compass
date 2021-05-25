import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectCountDownTimer, selectMemo, setText } from "../../../features/memo/memoSlice";
import { generateRandomString, isValidRequiredInput } from "../../../functions/common";

const MemoTextContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const timer = useSelector(selectCountDownTimer);
  const memo = useSelector(selectMemo);
  const isStart = timer.isStart;
  const title = memo.title;
  const texts = memo.texts;

  const [inputText, setInputText] = useState("");

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isStart) return;
      setInputText(e.target.value);
    },
    [isStart]
  );

  const setTextToState = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidRequiredInput(inputText)) return false;

    const newText = {
      id: generateRandomString(),
      text: inputText,
    };
    dispatch(setText(newText));
    setInputText("");
  };

  return (
    <div>
      {title && (
        <>
          <ul>
            {texts.map((text) => (
              <li key={text.id}>{text.text}</li>
            ))}
          </ul>
          {isStart && (
            <form onSubmit={setTextToState}>
              <input type="text" placeholder="テキスト入力" onChange={handleChangeText} value={inputText} autoFocus />
              <button>+</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default MemoTextContainer;
