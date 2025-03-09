import { Level } from "@prisma/client";
import { DeveloperDto } from "../modules/developer/dto/developer.dto";

export interface IDatabaseService {
  getDevelopers(): Promise<DeveloperDto[]>;

  getDevelopersByLevel(level: Level): Promise<DeveloperDto[]>;

  getDeveloperByName(name: string): Promise<DeveloperDto | undefined>;

  createDeveloper(developer: Omit<DeveloperDto, "id">): Promise<DeveloperDto>;

  updateDeveloper(
    id: number,
    updatedDeveloper: Partial<DeveloperDto>
  ): Promise<DeveloperDto | undefined>;

  deleteDeveloper(id: number): Promise<boolean>;
}
