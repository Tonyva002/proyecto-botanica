import { CuidadoRepository } from "../repositories/CuidadoRepository";

export class GetCuidadosUseCase {
  constructor(private repo: CuidadoRepository) {}

  execute() {
    return this.repo.getAll();
  }
}
