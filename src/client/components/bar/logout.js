import React from "react";
import { withApollo } from "@apollo/client/react/hoc";
// client comes from withApollo HOC (Higher-Order-Component) wrapping
const Logout = ({ changeLoginState, client }) => {
  const logout = () => {
    localStorage.removeItem("jwt-token");
    changeLoginState(false);
    client.stop();
    client.resetStore();
  };
  return (
    <button className="logout" onClick={logout}>
      Logout
    </button>
  );
};
export default withApollo(Logout);
