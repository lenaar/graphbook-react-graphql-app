import express from "express";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";
import path from "path";
import servicesLoader from "./services";
import db from "./database";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
const utils = {
  db,
};

const services = servicesLoader(utils);

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(helmet());

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "*.amazonaws.com"],
      },
    })
  );
}

app.use(compress());
app.use(cors());

const serviceNames = Object.keys(services);

for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i];

  if (name === "graphql") {
    (async () => {
      await services[name].start();
      app.use(graphqlUploadExpress());
      services[name].applyMiddleware({ app });
    })();
  } else {
    app.use("/${name}", services[name]);
  }
}

app.use(helmet.referrerPolicy({ policy: "same-origin" }));
const root = path.join(__dirname, "../../");
app.use("/", express.static(path.join(root, "dist/client")));
app.use("/uploads", express.static(path.join(root, "uploads")));
app.get("/", (req, res) => {
  res.sendFile(path.join(root, "/dist/client/index.html"));
});
app.listen(8000, () => console.log("Listening on port 8000!"));
