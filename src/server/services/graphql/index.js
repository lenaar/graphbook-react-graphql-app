import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

import Resolvers from "./resolvers";
import Schema from "./schema";
import authDirective from "./auth";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

export default (utils) => {
  const { authDirectiveTypeDefs, authDirectiveTransformer } =
    authDirective("auth");

  let executableSchema = makeExecutableSchema({
    typeDefs: [authDirectiveTypeDefs, Schema],
    resolvers: Resolvers.call(utils),
  });

  executableSchema = authDirectiveTransformer(executableSchema);

  const server = new ApolloServer({
    schema: executableSchema,
    context: async ({ req }) => {
      const { authorization } = req.headers;

      if (typeof authorization !== typeof undefined) {
        let search = "Bearer";
        let regEx = new RegExp(search, "ig");
        const token = authorization.replace(regEx, "").trim();
        return JWT.verify(token, JWT_SECRET, (error, result) => {
          if (error) return req;
          else
            return utils.db.models.User.findByPk(result.id).then((user) =>
              Object.assign({}, req, { user })
            );
        });
      } else return req;
    },
  });
  return server;
};
