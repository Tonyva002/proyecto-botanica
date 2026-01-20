import { CuidadoRepository } from "../../domain/repositories/CuidadoRepository";

export class ListarCuidados {
  constructor(private repo: CuidadoRepository) {}

  execute(plantaId: number) {
    return this.repo.findCuidadoByPlanta(plantaId);
  }
}
