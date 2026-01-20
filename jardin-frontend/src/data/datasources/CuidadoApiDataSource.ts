import { api } from "../../core/api/axios";
import { Cuidado } from "../../domain/entities/Cuidado";
import { CreateCuidadoPayload } from "../../domain/repositories/CuidadoRepository";

export default class CuidadoApiDataSource {
  async getByPlanta(plantaId: number): Promise<Cuidado[]> {
    if (!plantaId) return [];
    const { data } = await api.get<Cuidado[]>("/cuidados", {
      params: { plantaId },
    });
    return data;
  }

  async create(payload: CreateCuidadoPayload): Promise<Cuidado> {
    try {
      const { data } = await api.post<Cuidado>("/cuidados", payload);
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        "Error inesperado al crear el cuidado";

      throw new Error(message);
    }
  }
}
