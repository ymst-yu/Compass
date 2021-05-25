import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Route, Switch, BrowserRouter } from "react-router-dom";

// import react components
import Auth from "./Auth";
import Loading from "./components/UIKit/loading/Loading";
import Alert from "./components/UIKit/alert/Alert";
import App from "./App";
import SignUp from "./components/signup/SignUp";
import EmailSignUp from "./components/signup/EmailSignUp";
import Login from "./components/login/Login";
import PasswordReset from "./components/passwordReset/PasswordReset";
import Main from "./components/main/Main";
import Memo from "./components/memo/Memo";
import SendEmailAuthentication from "./components/emailAuthentication/SendEmailAuthentication";
import SentEmailAuthentication from "./components/emailAuthentication/SentEmailAuthentication";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Alert />
        <Loading>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signup/email" component={EmailSignUp} />
            <Route exact path="/password/reset" component={PasswordReset} />
            <Route exact path="/authentication/email/send" component={SendEmailAuthentication} />
            <Route exact path="/authentication/email/sent" component={SentEmailAuthentication} />
            <Auth>
              <Route exact path="/main" component={Main} />
              <Route exact path="/memo" component={Memo} />
            </Auth>
          </Switch>
        </Loading>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();
