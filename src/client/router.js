import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginRegisterForm from "./components/loginregister";

import Main from "./Main";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    loader={async () => {
      const { loggedIn } = rest;
      if (!loggedIn) throw redirect("/");
    }}
    element={<Component {...props} />}
  />
);

export const routing = ({ changeLoginState, loggedIn }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/app"
          element={<Main changeLoginState={changeLoginState} />}
        />
      </Routes>
    </Router>
  );
};

export default routing;
