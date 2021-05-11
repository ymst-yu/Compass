import React, { useState, useCallback } from "react";
import { Copyright } from "../UIKit";
import { signUp } from "../../features/authentication/operation";

// Materual-UI
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface UserInput {
  username: string;
  email: string;
  password: string;
  showPassword: boolean;
}

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

  // state
  const [values, setValues] = useState<UserInput>({
    username: "",
    email: "",
    password: "",
    showPassword: false,
  });

  // ユーザーが入力した値をstateに保存する
  const handleChange = useCallback(
    (prop: keyof UserInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: e.target.value });
    },
    [values]
  );

  // stateに保存された入力値をsignUp関数に送る
  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      signUp(values.username, values.email, values.password);
    },
    [values.username, values.email, values.password]
  );
  // パスワードの表示・非表示を切り替える
  const handleClickShowPassword = useCallback(() => {
    setValues({ ...values, showPassword: !values.showPassword });
  }, [values]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          アカウントの作成
        </Typography>
        <Typography component="p" variant="body2" color="textSecondary">
          アカウントはメールアドレスの認証完了後に作成されます。
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange("username")}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="ユーザーネーム"
                name="username"
                value={values.username}
                autoComplete="name"
              />
              <Typography component="span" variant="body2" color="textSecondary">
                ※アカウント名に使用します
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange("email")}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                value={values.email}
                autoComplete="email"
              />
              <Typography component="span" variant="body2" color="textSecondary">
                ※ログイン時に使用します
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth={true}>
                <InputLabel htmlFor="outlined-adornment-password" required>
                  パスワード
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={94}
                  autoComplete="new-password"
                />
              </FormControl>
              <Typography component="span" variant="body2" color="textSecondary">
                ※半角英数8文字以上
              </Typography>
            </Grid>
          </Grid>
          <div onClick={handleSubmit}>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              認証メールを送信
            </Button>
          </div>
          <Grid container justify="flex-end">
            <Grid item xs={12}>
              <Link href="/login" variant="body2">
                既にアカウントをお持ちの場合はこちらからログイン
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="/signup" variant="body2">
                戻る
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
