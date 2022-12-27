import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginRegisterForm from "./components/loginregister";

import Main from "./Main";

const PrivateRoute = ({ children, loggedIn }) =>
  loggedIn === true ? children : <Navigate to="/" />;

const LoginRoute = ({ children, loggedIn }) =>
  loggedIn === false ? children : <Navigate to="/app" />;

export const routing = ({ changeLoginState, loggedIn }) => {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/app"
          element={
            <PrivateRoute loggedIn={loggedIn}>
              <Main changeLoginState={changeLoginState} />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/"
          element={
            <LoginRoute loggedIn={loggedIn}>
              <LoginRegisterForm changeLoginState={changeLoginState} />
            </LoginRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default routing;
