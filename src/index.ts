import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import logger from "./logger/logger";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import authRouter from "./routes/authRoutes";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
	logger.error("error");
	logger.warn("warn");
	logger.info("info");
	logger.verbose("verbose");
	logger.debug("debug");
	logger.silly("silly");

	res.send("Hello World!");
});

app.use("/api", authRouter);

app.use(globalErrorHandler);

mongoose
	.connect(process.env.MONGO_URI || "")
	.then(() => {
		app.listen(port, () => {
			logger.info(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		logger.error(err);
	});
