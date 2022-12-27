import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginRegisterForm from "./components/loginregister";

import Main from "./Main";

import User from "./User";

const PrivateRoute = ({ children, loggedIn }) =>
  loggedIn === true ? children : <Navigate to="/" />;

const LoginRoute = ({ children, loggedIn }) =>
  loggedIn === false ? children : <Navigate to="/app" />;

const NotFound = () => {
  return <Navigate to="/" />;
};

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
          path="/user/:username"
          element={
            <PrivateRoute loggedIn={loggedIn}>
              <User changeLoginState={changeLoginState} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default routing;
