export class Cuidado {
  constructor(
    public readonly id: number,
    public readonly tipo: string,
    public readonly fechaInicio: Date,
    public readonly fechaFin?: Date,
    public readonly notas?: string,
  ) {}
}
