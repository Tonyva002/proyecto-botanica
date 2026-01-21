import { Repository } from "typeorm";
import { Cuidado } from "../../../domain/entities/Cuidado";
import { CuidadoRepository } from "../../../domain/repositories/CuidadoRepository";
import { AppDataSource } from "../../database/data-source";
import { CuidadoEntity } from "../entities/CuidadoEntity";
import { PlantaEntity } from "../entities/PlantaEntity";

export class CuidadoRepositoryImpl implements CuidadoRepository {
  private repo: Repository<CuidadoEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(CuidadoEntity);
  }

  async save(cuidado: Cuidado, plantaId: number): Promise<Cuidado> {
    const entity = new CuidadoEntity();

    entity.tipo = cuidado.tipo;
    entity.fechaInicio = cuidado.fechaInicio;
    entity.fechaFin = cuidado.fechaFin ?? null;
    entity.notas = cuidado.notas ?? null;

    const planta = new PlantaEntity();
    planta.id = plantaId;
    entity.planta = planta;

    const saved = await this.repo.save(entity);

    return new Cuidado(
      saved.id,
      saved.tipo,
      saved.fechaInicio,
      saved.fechaFin ?? undefined,
      saved.notas ?? undefined,
    );
  }

  async findCuidadoByPlanta(plantaId: number): Promise<Cuidado[]> {
    const entities = await this.repo.find({
      where: { planta: { id: plantaId } },
      order: { fechaInicio: "DESC" },
    });

    return entities.map(
      (e) =>
        new Cuidado(
          e.id,
          e.tipo,
          e.fechaInicio,
          e.fechaFin ?? undefined,
          e.notas ?? undefined,
        ),
    );
  }
}
