import React, { createContext } from "react";

import { ApolloConsumer } from "@apollo/client";

export const UserConsumer = ({ children }) => {
  return (
    <ApolloConsumer>
      {(client) => {
        const user = {
          username: "Sean_Howe",
          avatar:
            "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/832.jpg",
        };
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, { user });
        });
      }}
    </ApolloConsumer>
  );
};
