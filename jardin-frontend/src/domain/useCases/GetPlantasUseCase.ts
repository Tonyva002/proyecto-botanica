import { Planta } from "../entities/Planta";
import { PlantaRepository } from "../repositories/PlantaRepository";

export class GetPlantasUseCase {
  constructor(private readonly repo: PlantaRepository) {}

  execute(): Promise<Planta[]> {
    return this.repo.getAll();
  }
}
