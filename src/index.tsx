import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Route, Switch, BrowserRouter } from "react-router-dom";

// import react components
import Auth from "./Auth";
import App from "./App";
// import {
//   EmailSignUp,
//   Login,
//   ResetPassword,
//   Home,
//   Memo,
//   EmailRegistration,
//   EmailAuthentication,
// } from "./components/pages";
import SignUp from "./components/signup/SignUp";
import EmailSignUp from "./components/signup/EmailSignUp";
import Login from "./components/login/Login";
import PasswordReset from "./components/password_reset/PasswordReset";
import Home from "./components/home/Home";
import Memo from "./components/memo/Memo";
import EmailAuthentication from "./components/email_authentication/EmailAuthentication";
import EmailRegistration from "./components/email_registration/EmailRegistration";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signup/email" component={EmailSignUp} />
          <Route exact path="/password/reset" component={PasswordReset} />
          <Route exact path="/authentication/email" component={EmailAuthentication} />
          <Auth>
            <Route exact path="/signup/email/registration" component={EmailRegistration} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/memo" component={Memo} />
          </Auth>
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();
