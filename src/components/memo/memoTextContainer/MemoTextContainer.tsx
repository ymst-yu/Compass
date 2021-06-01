import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectCountDownTimer, selectMemo, setTexts } from "../../../features/memo/memoSlice";
import { generateRandomString, isValidRequiredInput } from "../../../functions/common";

type inputTextType = {
  id: string;
  editing: boolean;
  text: string;
};

const MemoTextContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const timer = useSelector(selectCountDownTimer);
  const memo = useSelector(selectMemo);
  const isStart = timer.isStart;
  const title = memo.title;

  const [inputText, setInputText] = useState("");
  const [inputTexts, setInputTexts] = useState<inputTextType[]>([]);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStart) return false;

    setInputText(e.target.value);
  };

  const handleCreateText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidRequiredInput(inputText)) return false;

    const newText: inputTextType = {
      id: generateRandomString(),
      editing: false,
      text: inputText,
    };

    setInputTexts([...inputTexts, newText]);
    setInputText("");
  };

  // テキストの編集状態を変更する
  const handleChangeTextAttribute = (id: string) => {
    const newTexts = inputTexts.map((text) => {
      if (text.id === id) {
        return {
          ...text,
          editing: !text.editing,
        };
      } else {
        return {
          ...text,
          editing: false,
        };
      }
    });
    setInputTexts(newTexts);
  };

  // テキストを更新する
  const handleEditText = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newTexts = inputTexts.map((text) => {
      if (text.id === id) {
        return {
          ...text,
          text: e.target.value,
        };
      }
      return text;
    });
    setInputTexts(newTexts);
  };

  // 作成したデータ(inputTexts)を整形し、storeに保管
  useEffect(() => {
    if (timer.count === 0) {
      // テキストが空のオブジェクトを除外
      const texts = inputTexts.filter((text) => isValidRequiredInput(text.text));

      // 全てのテキストの編集状態をfalseにする
      const newTexts = texts.map((text) => {
        if (text.editing) {
          return {
            ...text,
            editing: false,
          };
        }
        return text;
      });

      dispatch(setTexts(newTexts));
    }
  }, [dispatch, inputTexts, timer.count]);

  return (
    <div>
      {title && (
        <>
          <ul>
            {inputTexts.map((text) => (
              <li key={text.id} onClick={() => handleChangeTextAttribute(text.id)}>
                {text.editing && isStart ? (
                  <form onSubmit={() => handleChangeTextAttribute(text.id)}>
                    <input type="text" value={text.text} onChange={(e) => handleEditText(e, text.id)} autoFocus />
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
