import { Planta } from "../entities/Planta";

export interface PlantaRepository {
  findAll(nombre?: string): Promise<Planta[]>;
  findById(id: number): Promise<Planta | null>;
}
