require("dotenv").config();
import { config } from "./config";
import express from "express";
import morgan from "morgan";

import log from "./utils/logger";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler.middleware";

const app = express();
const port = config.get("port");

app.use(morgan("dev"));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

const main = () => {
  try {
    log.info(`Server listening at http://localhost:${port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

app.listen(port, main);
