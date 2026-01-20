import { Cuidado } from "../../../domain/entities/Cuidado";
import { CuidadoRepository } from "../../../domain/repositories/CuidadoRepository";
import { AppDataSource } from "../../database/data-source";
import { CuidadoEntity } from "../entities/CuidadoEntity";

export class CuidadoRepositoryImpl implements CuidadoRepository {
  private repo = AppDataSource.getRepository(CuidadoEntity);

  findCuidadoByPlanta(plantaId: number): Promise<Cuidado[]> {
    return this.repo.find({ where: { planta: { id: plantaId } } });
  }
  save(cuidado: Cuidado, plantaId: number): Promise<Cuidado> {
    return this.repo.save({
      tipo: cuidado.tipo,
      fechaInicio: cuidado.fechaInicio,
      planta: { id: plantaId },
    });
  }
}
