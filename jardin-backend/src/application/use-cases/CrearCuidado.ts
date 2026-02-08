import { Cuidado } from "../../domain/entities/Cuidado";
import { CuidadoRepository } from "../../domain/repositories/CuidadoRepository";

const TIPOS_VALIDOS = ["Riego", "Poda", "Fertilizacion", "Luz"] as const;
type TipoCuidado = (typeof TIPOS_VALIDOS)[number];

interface CreateCuidadoInput {
  plantaId: number;
  tipo: string;
  fechaInicio: string;
  fechaFin?: string | null;
  notas?: string | null;
}

export class CrearCuidado {
  constructor(private repo: CuidadoRepository) {}

  async execute(input: CreateCuidadoInput): Promise<Cuidado> {
    const { plantaId, tipo, fechaInicio, fechaFin, notas } = input;

    // Validar tipo
    if (!TIPOS_VALIDOS.includes(tipo as TipoCuidado)) {
      throw new Error(`Tipo de cuidado inválido: ${tipo}`);
    }

    // Convertir fechas AQUÍ
    const fechaInicioDate = new Date(fechaInicio);
    if (isNaN(fechaInicioDate.getTime())) {
      throw new Error("FechaInicio no es válida");
    }

    const fechaFinDate = fechaFin ? new Date(fechaFin) : undefined;

    if (fechaFinDate && isNaN(fechaFinDate.getTime())) {
      throw new Error("FechaFin no es válida");
    }

    if (fechaFinDate && fechaFinDate < fechaInicioDate) {
      throw new Error("FechaFin no puede ser anterior a FechaInicio");
    }

    // Obtener cuidados existentes
    const cuidados = await this.repo.findCuidadoByPlanta(plantaId);

    for (const c of cuidados) {
      const cFechaInicio = new Date(c.fechaInicio);

      // No repetir cuidado el mismo día
      if (
        c.tipo === tipo &&
        cFechaInicio.toDateString() === fechaInicioDate.toDateString()
      ) {
        throw new Error(
          `Ya existe un cuidado de tipo ${tipo} para esta planta en ese día`,
        );
      }

      // Riego 24h después de fertilización
      if (tipo === "Riego" && c.tipo === "Fertilizacion") {
        const diff = fechaInicioDate.getTime() - c.fechaInicio.getTime();

        if (diff >= 0 && diff <= 24 * 60 * 60 * 1000) {
          throw new Error(
            "No se puede regar dentro de las 24h posteriores a una fertilización",
          );
        }
      }

      // Poda y fertilización el mismo día
      if (
        (tipo === "Poda" && c.tipo === "Fertilizacion") ||
        (tipo === "Fertilizacion" && c.tipo === "Poda")
      ) {
        if (cFechaInicio.toDateString() === fechaInicioDate.toDateString()) {
          throw new Error(
            "Poda y fertilización no pueden ocurrir el mismo día",
          );
        }
      }
    }

    // Crear dominio con Date reales
    const cuidado = new Cuidado(
      0,
      tipo,
      fechaInicioDate,
      fechaFinDate,
      notas ?? undefined,
    );

    return this.repo.save(cuidado, plantaId);
  }
}
