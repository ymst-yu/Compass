import React, { useState, useCallback } from "react";
import { AppDispatch } from "../../app/store";
import { Copyright } from "../../components";
import { useDispatch } from "react-redux";
import { signUp } from "./operation";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleChangeUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputUsername(e.target.value);
    },
    [setInputUsername]
  );
  const handleChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputEmail(e.target.value);
    },
    [setInputEmail]
  );
  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputPassword(e.target.value);
    },
    [setInputPassword]
  );
  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      signUp(inputUsername, inputEmail, inputPassword);
    },
    [inputUsername, inputEmail, inputPassword]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          アカウント作成
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChangeUsername}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="ユーザーネーム"
                name="username"
                value={inputUsername}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChangeEmail}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                value={inputEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChangePassword}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                value={inputPassword}
              />
            </Grid>
          </Grid>
          <div onClick={handleSubmit}>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              アカウント作成
            </Button>
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                既にアカウントをお持ちの場合はこちら
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
