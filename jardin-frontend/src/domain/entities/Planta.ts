import { Cuidado } from "./Cuidado";

export interface Planta {
  id: number;
  nombre: string;
  especie: string;
  ubicacion: string;
  fechaRegistro: string;
  cuidados?: Cuidado[];
}
