import {
  CreateCuidadoPayload,
  CuidadoRepository,
} from "../repositories/CuidadoRepository";

export class CreateCuidadoUseCase {
  constructor(private repo: CuidadoRepository) {}

  execute(payload: CreateCuidadoPayload) {
    return this.repo.create(payload);
  }
}
