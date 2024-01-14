import express from "express";
import morgan from "morgan";
import log from "./utils/logger";
import router from "./routes";
import handlerError from "./middlewares/handler-error.middleware";

const app = express();
const port = 7000;

app.use(morgan("dev"));
app.use(express.json());

app.use(router);
app.use(handlerError);

app.listen(port, () => {
  log.info(`Listening on port ${port}`);
});
