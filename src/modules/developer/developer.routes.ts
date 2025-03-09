import express from "express";
import { developerController } from "./developer.controller";

const devRouter = express.Router();

devRouter.get("/all", developerController.getAll);
devRouter.get("/name/:name", developerController.getByName);
devRouter.get("/level/:level", developerController.getAllByLevel);
devRouter.post("/", developerController.create);
devRouter.put("/:id", developerController.update);
devRouter.delete("/:id", developerController.delete);

export default devRouter;
