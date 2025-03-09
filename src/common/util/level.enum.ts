import { Level } from "@prisma/client";

export class LevelUtils {
  public static fromString(level: string): Level | undefined {
    return Object.values(Level).includes(level as Level)
      ? (level as Level)
      : undefined;
  }
}
