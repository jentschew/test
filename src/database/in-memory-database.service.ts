import { Level } from "@prisma/client";
import { DeveloperDto } from "../modules/developer/dto/developer.dto";
import { IDatabaseService } from "./database.service.interface";

export class InMemoryDatabaseService implements IDatabaseService {
  private db: {
    developers: Map<number, DeveloperDto>;
  };
  private nextDevId: number;

  constructor() {
    this.db = {
      developers: new Map(),
    };

    this.nextDevId = 1;
    this.seed();
  }

  private seed() {
    const developer1: DeveloperDto = {
      id: this.nextDevId++,
      email: "john.doe@example.com",
      name: "John Doe",
      level: Level.Junior,
    };
    const developer2: DeveloperDto = {
      id: this.nextDevId++,
      email: "jane.doe@example.com",
      name: "Jane Doe",
      level: Level.Senior,
    };

    this.db.developers.set(developer1.id, developer1);
    this.db.developers.set(developer2.id, developer2);
  }

  async getDevelopers(): Promise<DeveloperDto[]> {
    return Array.from(this.db.developers.values());
  }

  async getDevelopersByLevel(level: Level): Promise<DeveloperDto[]> {
    return Array.from(this.db.developers.values()).filter(
      (developer) => developer.level === level
    );
  }

  async getDeveloperByName(name: string): Promise<DeveloperDto | undefined> {
    return Array.from(this.db.developers.values()).find(
      (developer) => developer.name.toLowerCase() === name.toLowerCase()
    );
  }

  async createDeveloper(
    developer: Omit<DeveloperDto, "id">
  ): Promise<DeveloperDto> {
    const newDeveloper: DeveloperDto = {
      ...developer,
      id: this.nextDevId++,
    };

    const created = this.db.developers.set(newDeveloper.id, newDeveloper);
    return newDeveloper;
  }

  async updateDeveloper(
    id: number,
    updatedDeveloper: Partial<DeveloperDto>
  ): Promise<DeveloperDto | undefined> {
    const existingDeveloper = this.db.developers.get(id);
    if (existingDeveloper) {
      const updated = { ...existingDeveloper, ...updatedDeveloper };
      this.db.developers.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteDeveloper(id: number): Promise<boolean> {
    const developerExists = this.db.developers.has(id);
    if (developerExists) {
      return this.db.developers.delete(id);
    }
    return false;
  }
}
