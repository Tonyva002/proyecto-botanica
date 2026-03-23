import { TipoCuidado } from "../entities/Cuidado";
import { CuidadoRepository } from "../repositories/CuidadoRepository";

export class GetTipoCuidadoUseCase {
        constructor(private readonly repo: CuidadoRepository) {}

        execute(): Promise<TipoCuidado[]> {
                return this.repo.getAllTypes();
        }
}