import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MemoTitle.module.scss";
import { AppDispatch } from "../../../app/store";
import { setTitle, startTimer, selectMemo } from "../../../features/memo/memoSlice";

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
      dispatch(setTitle(inputTitle));
      setInputTitle("");
      dispatch(startTimer(true));
    },
    [dispatch, inputTitle]
  );

  return (
    <>
      {title ? (
        <div>{title}</div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            label="タイトルを入力"
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
