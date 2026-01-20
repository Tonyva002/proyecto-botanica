import { PlantaRepository } from "../../domain/repositories/PlantaRepository";

export class ObtenerPlantas {
  constructor(private repo: PlantaRepository) {}

  execute(nombre?: string) {
    return this.repo.findAll(nombre);
  }
}
