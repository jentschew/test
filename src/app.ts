import express from "express";
const app = express();
import devRouter from "./modules/developer/developer.routes";

app.use(express.json());

app.use("/api/developer", devRouter);

export { app };
