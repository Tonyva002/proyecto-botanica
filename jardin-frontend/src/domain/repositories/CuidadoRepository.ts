import { Cuidado } from "../entities/Cuidado";

export interface CreateCuidadoPayload {
  tipo: string;
  fechaInicio: string;
  plantaId: number;
}

export interface CuidadoRepository {
  findByPlanta(plantaId: number): Promise<Cuidado[]>;
  create(data: CreateCuidadoPayload): Promise<Cuidado>;
}
