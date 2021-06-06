import React from "react";
import { Copyright } from "../UIKit";

import { Box, Paper, Link, Typography, Button } from "@material-ui/core";

const AfterLogout: React.FC = () => {
  return (
    <div>
      <Typography component="h1" variant="h5">
        ログアウトしました。
      </Typography>
      <Link href="/">
        <Button>ホームへ戻る</Button>
      </Link>
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );
};

export default AfterLogout;
