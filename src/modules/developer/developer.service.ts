import { Level } from "@prisma/client";
import { DatabaseFactory } from "../../database/database.service";
import { IDatabaseService } from "../../database/database.service.interface";
import { DeveloperDto } from "./dto/developer.dto";

export class DeveloperService {
  private databaseService: IDatabaseService;

  constructor() {
    this.databaseService = DatabaseFactory.createDatabaseService();
  }

  async getAll(): Promise<DeveloperDto[]> {
    return await this.databaseService.getDevelopers();
  }

  async getAllByLevel(level: Level): Promise<DeveloperDto[]> {
    return await this.databaseService.getDevelopersByLevel(level);
  }

  async getByName(name: string): Promise<DeveloperDto | undefined> {
    return await this.databaseService.getDeveloperByName(name);
  }

  async create(developer: DeveloperDto): Promise<DeveloperDto> {
    try {
      return await this.databaseService.createDeveloper(developer);
    } catch (error: any) {
      throw error;
    }
  }

  async update(
    id: number,
    developer: DeveloperDto
  ): Promise<DeveloperDto | undefined> {
    return await this.databaseService.updateDeveloper(id, developer);
  }

  async delete(id: number): Promise<boolean> {
    return await this.databaseService.deleteDeveloper(id);
  }
}
