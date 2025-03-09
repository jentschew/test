import { IDatabaseService } from "./database.service.interface";
import { PostgresDatabaseService } from "./postgres-database.service";
import { InMemoryDatabaseService } from "./in-memory-database.service";

export class DatabaseFactory {
  static createDatabaseService(): IDatabaseService {
    if (process.env.NODE_ENV === "production") {
      return new PostgresDatabaseService();
    } else {
      return new InMemoryDatabaseService();
    }
  }
}
