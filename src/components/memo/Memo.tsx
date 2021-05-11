import React, { useState, useCallback } from "react";
import { generateNowDateString } from "../../functions/common";
import { NowDate, CountDownTimer } from "../UIKit";
import MemoTitle from "./memoTitle/MemoTitle";
import MemoTextArea from "./memoTextArea/MemoTextArea";

interface MemoState {
  id: string;
  title: string;
  texts: {
    id: string;
    text: string;
  }[];
  created_at: string;
}

const Memo: React.FC = () => {
  const [values, setValues] = useState<MemoState>({
    id: "",
    title: "",
    texts: [],
    created_at: generateNowDateString(),
  });

  const handleChange = useCallback(
    (prop: keyof MemoState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: e.target.value });
    },
    [values]
  );

  // const combineText = useCallback(() => {
  //   const id = generateRandomString();
  //   const newText = {
  //     id: id,
  //     text: inputText,
  //   };
  //   if (inputTexts[0].id === "") {
  //     setInputTexts([newText]);
  //   } else {
  //     setInputTexts([...inputTexts, newText]);
  //   }
  // }, [inputText, inputTexts, setInputTexts]);

  // const handleSubmit = useCallback(
  //   (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     const sendData = {
  //       id: generateRandomString(),
  //       title: inputTitle,
  //       texts: inputTexts,
  //       tags: ["business", "money", "health"], // 選択したタグが格納されるように機能追加する
  //     };
  //     createMemo(sendData);
  //     setInputTexts([]);
  //     console.log("data: ", sendData);
  //   },
  //   [inputTexts, inputTitle]
  // );

  return (
    <div>
      <div>
        <NowDate />
      </div>
      <div>
        <CountDownTimer />
      </div>
      <div>
        <MemoTitle />
      </div>
      <div>
        <MemoTextArea />
      </div>
    </div>
  );
};

export default Memo;
