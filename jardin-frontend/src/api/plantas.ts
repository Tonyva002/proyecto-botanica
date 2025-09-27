import api from "./axios";

export interface Planta {
  id: number;
  nombre: string;
  especie: string;
  ubicacion: string;
  fechaRegistro: string; 
}

// Obtener todas las plantas
export const getPlantas = async (): Promise<Planta[]> => {
  const { data } = await api.get<Planta[]>("/plantas");
  return data;
};

// Obtener planta por ID
export const getPlantaById = async (id: number): Promise<Planta> => {
  const { data } = await api.get<Planta>(`/plantas/${id}`);
  return data;
};
