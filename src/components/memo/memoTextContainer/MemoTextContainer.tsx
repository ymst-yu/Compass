import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  selectCountDownTimer,
  selectMemo,
  setText,
  updateText,
  changeTextAttribute,
} from "../../../features/memo/memoSlice";
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

  const handleCreateText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidRequiredInput(inputText)) return false;

    const newText = {
      id: generateRandomString(),
      editing: false,
      text: inputText,
    };

    dispatch(setText(newText));
    setInputText("");
  };

  // テキストの編集状態を変更する
  const handleChangeTextAttribute = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLLIElement>,
    id: string
  ) => {
    e.preventDefault();
    dispatch(changeTextAttribute(id));
  };

  // テキストを更新する
  const handleUpdateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = {
      id: e.target.id,
      text: e.target.value,
    };
    dispatch(updateText(newText));
  };

  return (
    <div>
      {title && (
        <>
          <ul>
            {texts.map((text) => (
              <li key={text.id} onClick={(e) => handleChangeTextAttribute(e, text.id)}>
                {text.editing && isStart ? (
                  <form onSubmit={(e) => handleChangeTextAttribute(e, text.id)}>
                    <input id={text.id} type="text" value={text.text} onChange={handleUpdateText} autoFocus />
                  </form>
                ) : (
                  text.text
                )}
              </li>
            ))}
          </ul>
          {isStart && (
            <form onSubmit={handleCreateText}>
              <input type="text" placeholder="テキスト入力" onChange={handleChangeText} value={inputText} autoFocus />
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default MemoTextContainer;
