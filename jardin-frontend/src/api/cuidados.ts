import api from "./axios";
import { Planta } from "./plantas";

export interface Cuidado {
  id: number;
  tipo: string;
  fechaInicio: string;
  fechaFin: string | null;
  notas: string;
  planta: Planta;
}

// Payload para crear un cuidado
export interface CreateCuidadoPayload {
  tipo: string;
  fechaInicio: string;
  fechaFin?: string | null;
  notas?: string;
  plantaId: number;
}

// Obtener todos los cuidados
export const getCuidados = async (): Promise<Cuidado[]> => {
  const { data } = await api.get<Cuidado[]>("/cuidados");
  return data;
};

// Crear un cuidado nuevo
export const createCuidado = async (
  data: CreateCuidadoPayload
): Promise<Cuidado> => {
  const response = await api.post<Cuidado>("/cuidados", data);
  return response.data;
};
