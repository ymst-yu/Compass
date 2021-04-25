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
import Login from "./features/authentication/Login";
import SignUp from "./features/authentication/SignUp";
import PasswordReset from "./features/authentication/PasswordReset";
import Memo from "./features/memo/Memo";
import { Home } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/password/reset" component={PasswordReset} />
          <Auth>
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
