import { DataSource } from "typeorm";
import { PlantaEntity } from "../typeorm/entities/PlantaEntity";
import { CuidadoEntity } from "../typeorm/entities/CuidadoEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [PlantaEntity, CuidadoEntity],
  synchronize: true,
});
