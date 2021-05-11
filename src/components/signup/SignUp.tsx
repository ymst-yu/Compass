import React from "react";
import { Copyright } from "../UIKit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

// Materual-UI
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
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

const SignUp: React.FC = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
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
              <Button variant="contained" color="primary" fullWidth href="/signup/email">
                メールアドレスで登録
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth startIcon={<FontAwesomeIcon icon={faGoogle} />}>
                Google
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth startIcon={<FontAwesomeIcon icon={faTwitter} />}>
                Twitter
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth startIcon={<FontAwesomeIcon icon={faFacebook} />}>
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
    </Container>
  );
};

export default SignUp;
