import { PlantaRepository } from "../../domain/repositories/PlantaRepository";

export class ObtenerPlantaPorId {
  constructor(private repo: PlantaRepository) {}

  execute(id: number) {
    return this.repo.findById(id);
  }
}
