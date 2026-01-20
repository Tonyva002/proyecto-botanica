import { CuidadoRepository } from "../repositories/CuidadoRepository";

export class GetCuidadosUseCase {
  constructor(private repo: CuidadoRepository) {}

  execute(plantaId: number) {
    return this.repo.findByPlanta(plantaId);
  }
}
