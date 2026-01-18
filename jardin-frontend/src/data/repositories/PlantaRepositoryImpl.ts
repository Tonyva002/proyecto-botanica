import { Planta } from "../../domain/entities/Planta";
import { PlantaRepository } from "../../domain/repositories/PlantaRepository";
import { PlantaApiDataSource } from "../datasources/PlantaApiDataSource";

export class PlantaRepositoryImpl implements PlantaRepository {
  constructor(private dataSource = new PlantaApiDataSource()) {}
  getAll(): Promise<Planta[]> {
    return this.dataSource.getAll();
  }
  getById(id: number): Promise<Planta> {
    return this.dataSource.getById(id);
  }
}
