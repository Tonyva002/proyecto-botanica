import { DataSource } from "typeorm";
import { Planta } from "./entities/Planta";
import { Cuidado } from "./entities/Cuidado";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "jardin",
  entities: [Planta, Cuidado],
  synchronize: true,
  logging: true,
});
