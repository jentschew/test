import { Level } from "@prisma/client";

export class DeveloperDto {
  id: number;
  email: string;
  name: string;
  level: Level;

  constructor(id: number, name: string, email: string, level: Level) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.level = level;
  }
}
