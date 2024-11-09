import express from "express";
import logger from "./logger/logger";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  logger.error("error");
  logger.warn("warn");
  logger.info("info");
  logger.verbose("verbose");
  logger.debug("debug");
  logger.silly("silly");

  res.send("Hello World!");
});

app.use("/api", authRouter);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
