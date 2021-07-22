import React, { useCallback } from "react";
import { Copyright } from "../UIKit";
import { sendEmailVerification } from "../../features/authentication/util";

// Materual-UI
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SentEmailAuthentication: React.FC = () => {
  const classes = useStyles();

  const handleSubmit = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    sendEmailVerification();
  }, []);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            認証メールを送信しました
          </Typography>
          <Box mb={2} />
          <Typography component="p" variant="body2" color="textSecondary">
            サービスはメールアドレス認証後にご利用いただけます。
          </Typography>
          <Typography component="p" variant="body2" color="textSecondary">
            メール記載のURLより認証をお願い致します。
          </Typography>
          <Typography component="p" variant="body2" color="textSecondary">
            メールが届いていない場合には以下より再送信をお願いします。
          </Typography>
          <form className={classes.form} noValidate>
            <div onClick={handleSubmit}>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                認証メールを再送信
              </Button>
            </div>
            <Link href="/login" variant="body2">
              ログイン画面へ
            </Link>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default SentEmailAuthentication;
