import { api } from "../../core/api/axios";
import { Planta } from "../../domain/entities/Planta";

export class PlantaApiDataSource {
  async getAll(): Promise<Planta[]> {
    const { data } = await api.get<Planta[]>("/plantas");
    return data;
  }

  async getById(id: number): Promise<Planta> {
    const { data } = await api.get<Planta>(`/plantas/${id}`);
    return data;
  }
}
