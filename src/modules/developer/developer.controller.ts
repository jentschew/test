import { LevelUtils } from "../../common/util/level.enum";
import { DeveloperService } from "./developer.service";
import { Request, Response } from "express";

class DeveloperController {
  private developerService: DeveloperService;

  constructor() {
    this.developerService = new DeveloperService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const developers = await this.developerService.getAll();
      res.status(200).json(developers);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error retrieving developers.");
    }
  };

  getAllByLevel = async (req: Request, res: Response) => {
    const { level } = req.params;
    const levelEnum = LevelUtils.fromString(level);

    if (levelEnum === undefined) {
      res.status(400).send("Invalid level value.");
      return;
    }

    try {
      const developers = await this.developerService.getAllByLevel(levelEnum);
      res.status(200).json(developers);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error retrieving developers.");
    }
  };

  getByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const developer = await this.developerService.getByName(name);
      if (developer === undefined) {
        res.status(404).send("User not found.");
        return;
      }
      res.status(200).json(developer);
    } catch (err) {
      res.status(500).send("Error retrieving developers.");
    }
  };

  create = async (req: Request, res: Response) => {
    const developer = req.body;
    try {
      const newDeveloper = await this.developerService.create(developer);
      res.status(201).json(newDeveloper);
    } catch (err: any) {
      if (err.message === "A developer with this email already exists.") {
        res.status(409).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const developer = req.body;
    try {
      const idNumber = parseInt(id);
      const updatedDeveloper = await this.developerService.update(
        idNumber,
        developer
      );
      if (updatedDeveloper) {
        res.status(200).json(updatedDeveloper);
        return;
      } else {
        res.status(404).send("Developer not found.");
      }
    } catch (err) {
      res.status(500).send("Error updating developer.");
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const idNumber = parseInt(id);
      const result = await this.developerService.delete(idNumber);
      if (result) {
        res.status(200).send("Developer was deleted.");
      } else {
        res.status(404).send("Developer not found.");
      }
    } catch (err) {
      res.status(500).send("Error deleting developer.");
    }
  };
}

export const developerController = new DeveloperController();
