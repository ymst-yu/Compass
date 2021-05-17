import React, { useState, useCallback } from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/authentication/operation";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Copyright } from "../UIKit";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const PasswordReset: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const [inputEmail, setInputEmail] = useState("");

  const handleChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputEmail(e.target.value);
    },
    [setInputEmail]
  );
  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      dispatch(resetPassword(inputEmail)).then(() => {
        setInputEmail("");
      });
    },
    [inputEmail, dispatch]
  );

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            パスワードのリセット
          </Typography>
          <Box mt={2}>
            <Typography component="h1" variant="body1">
              パスワードのリセットメールを送信します。
            </Typography>
          </Box>
          <form className={classes.form} noValidate>
            <TextField
              onChange={handleChangeEmail}
              value={inputEmail}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <div onClick={handleSubmit}>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                送信
              </Button>
            </div>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  ホームに戻る
                </Link>
              </Grid>
            </Grid>
            <Box mt={4}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default PasswordReset;
