import React, { useState } from "react";
import { useLoginMutation } from "../apollo/mutations/login";
import Loading from "./loading";
import Error from "./error";

const LoginForm = ({ changeLoginState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useLoginMutation();
  const onSubmit = (event) => {
    event.preventDefault();
    login({
      update(cache, { data: { login } }) {
        if (login.token) {
          localStorage.setItem("jwt", login.token);
          changeLoginState(true);
        }
      },
      variables: { email, password },
    });
  };
  return (
    <div className="login">
      {!loading && (
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>Password</label>
          <input onChange={(event) => setPassword(event.target.value)} />
          <input type="submit" value="Login" />
        </form>
      )}
      {loading && <Loading />}
      {error && (
        <Error>
          <p>There was an error logging in</p>
        </Error>
      )}
    </div>
  );
};
