import { Planta } from "./Planta";

export interface Cuidado {
  id: number;
  tipo: string;
  fechaInicio: string;
  fechaFin?: string | null;
  notas?: string;
  planta?: Planta;
}
