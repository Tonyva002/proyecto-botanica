import { api } from "../../core/api/axios";
import { Cuidado } from "../../domain/entities/Cuidado";
import { CreateCuidadoPayload } from "../../domain/repositories/CuidadoRepository";

export default class CuidadoApiDataSource {
  async getAll(): Promise<Cuidado[]> {
    return await api.get<Cuidado[]>("/cuidados").then((r) => r.data);
  }

  async create(payload: CreateCuidadoPayload): Promise<Cuidado> {
    return await api.post<Cuidado>("/cuidados", payload).then((r) => r.data);
  }
}
