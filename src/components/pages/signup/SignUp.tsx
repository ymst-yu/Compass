import React, { FC } from "react";
import { Copyright, EmailAuthenticationModal } from "../../organisms";

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

const SignUp: FC = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Box mb={2}>
          <Typography component="h1" variant="h5" align="center">
            アカウント作成
          </Typography>
          <Typography component="span" variant="body1" color="textSecondary" align="center">
            作成方法を選択してください
          </Typography>
        </Box>
        <Box mb={2}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                メールアドレスで登録
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" fullWidth>
                Google
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" fullWidth>
                Twitter
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" fullWidth>
                Facebook
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Link href="/login" variant="body2">
          既にアカウントをお持ちの場合はこちらからログイン
        </Link>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <EmailAuthenticationModal />
    </Container>
  );
};

export default SignUp;
