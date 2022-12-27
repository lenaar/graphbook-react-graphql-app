import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { faker } from "@faker-js/faker";
import { withApollo } from "@apollo/client/react/hoc";
import Router from "./router";
import Loading from "./components/loading";
import LoginRegisterForm from "./components/loginregister";
import { useCurrentUserQuery } from "./apollo/queries/currentUserQuery";
import "./components/fontawesome";
import "cropperjs/dist/cropper.css";
import "../../assets/css/style.css";

const App = ({ client }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwt-token"));
  const { data, error, loading, refetch } = useCurrentUserQuery();
  const handleLogin = (status) =>
    refetch()
      .then(() => setLoggedIn(status))
      .catch(() => setLoggedIn(status));
  useEffect(() => {
    const unsubscribe = client.onClearStore(() => {
      if (loggedIn) setLoggedIn(false);
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <Helmet>
        <title>Graphbook - Feed</title>
        <meta
          name="description"
          content="Newsfeed of all fake friends on Graphbook"
        />
      </Helmet>
      <Router loggedIn={loggedIn} changeLoginState={handleLogin} />{" "}
    </div>
  );
};
export default withApollo(App);
