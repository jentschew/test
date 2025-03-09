import { Level, PrismaClient } from "@prisma/client";
import { DeveloperDto } from "../modules/developer/dto/developer.dto";
import { IDatabaseService } from "./database.service.interface";

export class PostgresDatabaseService implements IDatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getDevelopers(): Promise<DeveloperDto[]> {
    return await this.prisma.developer.findMany();
  }

  async getDevelopersByLevel(level: Level): Promise<DeveloperDto[]> {
    return await this.prisma.developer.findMany({
      where: {
        level: level,
      },
    });
  }

  async getDeveloperByName(name: string): Promise<DeveloperDto | undefined> {
    const developer = await this.prisma.developer.findFirst({
      where: {
        name: name,
      },
    });

    if (!developer) return undefined;

    return developer;
  }

  async createDeveloper(
    developer: Omit<DeveloperDto, "id">
  ): Promise<DeveloperDto> {
    const existingDeveloper = await this.prisma.developer.findUnique({
      where: { email: developer.email },
    });

    if (existingDeveloper) {
      throw new Error("A developer with this email already exists.");
    }

    return await this.prisma.developer.create({
      data: {
        name: developer.name,
        email: developer.email,
        level: developer.level,
      },
    });
  }

  async updateDeveloper(
    id: number,
    updatedDeveloper: Partial<DeveloperDto>
  ): Promise<DeveloperDto | undefined> {
    const existingDeveloper = await this.prisma.developer.findUnique({
      where: { id },
    });

    if (!existingDeveloper) return undefined;

    return await this.prisma.developer.update({
      where: { id },
      data: {
        ...updatedDeveloper,
      },
    });
  }

  async deleteDeveloper(id: number): Promise<boolean> {
    const existingDeveloper = await this.prisma.developer.findUnique({
      where: { id },
    });

    if (!existingDeveloper) {
      throw new Error("This developer does not exist.");
    }

    await this.prisma.developer.delete({
      where: { id },
    });

    return true;
  }
}
