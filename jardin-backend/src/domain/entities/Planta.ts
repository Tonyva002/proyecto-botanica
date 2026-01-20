import { Cuidado } from "./Cuidado";

export class Planta {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly especie: string,
    public readonly ubicacion?: string,
    public readonly cuidados: Cuidado[] = [],
  ) {}
}
