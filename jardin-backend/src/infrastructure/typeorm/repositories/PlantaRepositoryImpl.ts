import { Cuidado } from "../../../domain/entities/Cuidado";
import { Planta } from "../../../domain/entities/Planta";
import { PlantaRepository } from "../../../domain/repositories/PlantaRepository";
import { AppDataSource } from "../../database/data-source";
import { PlantaEntity } from "../entities/PlantaEntity";

export class PlantaRepositoryImpl implements PlantaRepository {
  private repo = AppDataSource.getRepository(PlantaEntity);

  async findAll(nombre?: string): Promise<Planta[]> {
    const query = this.repo.createQueryBuilder("planta");

    if (nombre) {
      query.where("planta.nombre LIKE :nombre", {
        nombre: `%${nombre}%`,
      });
    }
    const plantas = await query.getMany();

    return plantas.map(
      (p) => new Planta(p.id, p.nombre, p.especie, p.ubicacion),
    );
  }

  async findById(id: number): Promise<Planta | null> {
    const planta = await this.repo.findOne({
      where: { id },
      relations: ["cuidados"],
    });

    if (!planta) return null;

    return new Planta(
      planta.id,
      planta.nombre,
      planta.especie,
      planta.ubicacion,
      planta.cuidados.map(
        (c) => new Cuidado(c.id, c.tipo, c.fechaInicio, c.fechaFin, c.notas),
      ),
    );
  }
}
