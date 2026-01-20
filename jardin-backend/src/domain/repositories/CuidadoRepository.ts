import { Cuidado } from "../entities/Cuidado";

export interface CuidadoRepository {
  findCuidadoByPlanta(plantaId: number): Promise<Cuidado[]>;
  save(cuidado: Cuidado, plantaId: number): Promise<Cuidado>;
}
