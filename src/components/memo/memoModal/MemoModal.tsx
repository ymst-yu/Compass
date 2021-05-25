import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectMemo, selectModal, handleModalOpen } from "../../../features/memo/memoSlice";
import { saveMemo } from "../../../features/memo/operation";

import styles from "./MemoModal.module.scss";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const MemoModal: React.FC = () => {
  const isModalOpen = useSelector(selectModal);
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const memo = useSelector(selectMemo);
  const [modalStyle] = useState(getModalStyle);
  const [body, setBody] = useState(true);

  const toggleModal = () => {
    setBody(!body);
  };

  const body1: JSX.Element = (
    <div style={modalStyle} className={classes.paper}>
      <Typography component="h2" variant="h5" align="center">
        タイムアップ！
      </Typography>
      <Box mb={2} />
      <Typography component="p" variant="body1" align="center">
        このメモを保存しますか？
      </Typography>
      <Box mb={3} />
      <Grid container justify="center" spacing={8}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(saveMemo(memo)).then(() => setBody(!body))}
          >
            保存する
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={toggleModal}>
            保存しない
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  const body2 = (
    <div style={modalStyle} className={classes.paper}>
      <Typography component="h2" variant="h5" align="center">
        タイムアップ！
      </Typography>
      <Box mb={2} />
      <Typography component="p" variant="body1" align="center">
        続けてメモを書きますか？
      </Typography>
      <Box mb={3} />
      <Grid container justify="center" spacing={8}>
        <Grid item>
          <Button variant="contained" color="primary">
            続ける
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => dispatch(handleModalOpen(false))}>
            終了する
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <Modal open={isModalOpen} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      {body ? body1 : body2}
    </Modal>
  );
};

export default MemoModal;
