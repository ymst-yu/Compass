import React, { FC, memo, useState, useCallback } from "react";
import { createMemo } from "./operation";
import { TextField } from "@material-ui/core";
import { generateRandomString } from "../../functions/common";

const Memo: FC = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [inputTexts, setInputTexts] = useState([{ id: "", text: "" }]);

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputTitle(e.target.value);
    },
    [setInputTitle]
  );
  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    },
    [setInputText]
  );
  const combineText = useCallback(() => {
    const id = generateRandomString();
    const newText = {
      id: id,
      text: inputText,
    };
    if (inputTexts[0].id === "") {
      setInputTexts([newText]);
    } else {
      setInputTexts([...inputTexts, newText]);
    }
  }, [inputText, inputTexts, setInputTexts]);

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const sendData = {
        id: generateRandomString(),
        title: inputTitle,
        texts: inputTexts,
        tags: ["business", "money", "health"], // 選択したタグが格納されるように機能追加する
      };
      createMemo(sendData);
      setInputTexts([]);
      console.log("data: ", sendData);
    },
    [inputTexts, inputTitle]
  );

  return (
    <div>
      <div>
        <TextField
          value={inputTitle}
          name="title"
          label="タイトルを入力"
          variant="outlined"
          onChange={handleChangeTitle}
        />
        <button>+</button>
      </div>
      <div>
        <TextField variant="outlined" onChange={handleChangeText} />
        <button>+</button>
        <button onClick={combineText}>push</button>
      </div>
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
};

export default Memo;
