import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MemoTitle.module.scss";
import { AppDispatch } from "../../../app/store";
import { setTitle, startTimer, selectMemo } from "../../../features/memo/memoSlice";

import { isValidRequiredInput } from "../../../functions/common";

// Material-UI
import { TextField, Button } from "@material-ui/core";

const MemoTitle: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const memo = useSelector(selectMemo);
  const title = memo.title;

  const [inputTitle, setInputTitle] = useState("");

  const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isValidRequiredInput(inputTitle)) return;
      dispatch(setTitle(inputTitle));
      setInputTitle("");
      dispatch(startTimer(true));
    },
    [dispatch, inputTitle]
  );

  return (
    <>
      {title ? (
        <div>
          {title}
          <Button color="default" variant="outlined">
            入力を終了する
          </Button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            label="ここにタイトルを入力"
            variant="outlined"
            fullWidth
            margin="dense"
            onChange={handleChangeTitle}
            value={inputTitle}
          />
          <Button type="submit" color="primary" variant="contained">
            Start
          </Button>
        </form>
      )}
    </>
  );
};

export default MemoTitle;
