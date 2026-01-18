import { PlantaRepository } from "../repositories/PlantaRepository";

export class GetPlantaByIdUseCase {
  constructor(private repo: PlantaRepository) {}

  execute(id: number) {
    return this.repo.getById(id);
  }
}
