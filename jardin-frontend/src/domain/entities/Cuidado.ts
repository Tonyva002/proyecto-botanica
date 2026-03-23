import { Planta } from "./Planta";

export type TipoCuidado = "Riego" | "Poda" | "Fertilizacion" | "Luz";

export interface Cuidado {
  id: number;
  tipo: string;
  fechaInicio: string;
  fechaFin?: string | null;
  notas?: string;
  planta?: Planta;
}
