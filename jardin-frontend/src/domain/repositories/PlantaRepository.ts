import { Planta } from "../entities/Planta";

export interface PlantaRepository {
  getAll(): Promise<Planta[]>;
  getById(id: number): Promise<Planta>;
}
