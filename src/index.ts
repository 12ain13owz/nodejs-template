import express from "express";
import morgan from "morgan";
import config from "config";

import log from "./utils/logger";
import router from "./routes";
import errorHandler from "./middlewares/error-handler.middleware";

const app = express();
const port = config.get<number>("port");

app.use(morgan("dev"));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  log.info(`Server listening on port ${port}`);
});
