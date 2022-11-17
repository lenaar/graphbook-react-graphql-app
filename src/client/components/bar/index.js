import React from "react";
import Logout from "./logout";
import SearchBar from "./search";
import UserBar from "./user";
import { UserConsumer } from "../context/user";

const Bar = ({ changeLoginState }) => {
  return (
    <div className="topbar">
      <div className="inner">
        <SearchBar />
        <UserConsumer>
          <UserBar />
        </UserConsumer>
      </div>
      <div className="buttons">
        <Logout changeLoginState={changeLoginState} />
      </div>
    </div>
  );
};

export default Bar;
