import { Cuidado } from "../../domain/entities/Cuidado";
import { CuidadoRepository } from "../../domain/repositories/CuidadoRepository";

const TIPOS_VALIDOS = ["Riego", "Poda", "Fertilizacion", "Luz"] as const;
type tipoCuidado = (typeof TIPOS_VALIDOS)[number];

interface CreateCuidadoInput {
  plantaId: number;
  tipo: string;
  fechaInicio: Date;
  fechaFin?: Date;
  notas?: string;
}

export class CrearCuidado {
  constructor(private repo: CuidadoRepository) {}

  async execute(input: CreateCuidadoInput): Promise<Cuidado> {
    const { plantaId, tipo, fechaInicio, fechaFin, notas } = input;

    // Validar tipo
    if (!TIPOS_VALIDOS.includes(tipo as tipoCuidado)) {
      throw new Error(`Tipo de cuidado invalido: ${tipo}`);
    }

    // Validar fechas
    if (isNaN(fechaInicio.getTime())) {
      throw new Error("FechaInicio no es valida");
    }

    if (fechaFin) {
      if (isNaN(fechaFin.getTime())) {
        throw new Error("FechaFin no es valida");
      }

      if (fechaFin < fechaInicio) {
        throw new Error("FechaFin no puede ser anterior a FechaInicio");
      }
    }

    // Obtener cuidados existentes
    const cuidados = await this.repo.findCuidadoByPlanta(plantaId);

    for (const c of cuidados) {
      const cFechaInicio = new Date(c.fechaInicio);

      //No repetir cuidado el mismo dia
      if (
        c.tipo === tipo &&
        cFechaInicio.toDateString() === fechaInicio.toDateString()
      ) {
        throw new Error(
          `Ya existe un cuidado de tipo ${tipo} para esta planta en ese dia`,
        );
      }

      // Riego 24h después de fertilizar
      if (tipo === "Riego" && c.tipo === "Fertilizacion") {
        const diff = fechaInicio.getTime() - c.fechaInicio.getTime();
        if (diff >= 0 && diff <= 24 * 60 * 60 * 1000) {
          throw new Error(
            "No se puede regar dentro de las 24h posteriores a una fertilizacion",
          );
        }
      }

      // Poda y fertilizacion el mismo dia
      if (
        (tipo === "Poda" && c.tipo === "Fertilizacion") ||
        (tipo === "Fertilizacion" && c.tipo === "Poda")
      ) {
        if (cFechaInicio.toDateString() === fechaInicio.toDateString()) {
          throw new Error(
            "Poda y fertilizacion no pueden ocurrir el mismo dia",
          );
        }
      }
    }

    // Crear entidad de dominio y guardar
    const cuidado = new Cuidado(0, tipo, fechaInicio, fechaFin, notas);
    return this.repo.save(cuidado, plantaId);
  }
}
