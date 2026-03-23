import { esTipoCuidado } from "../../domain/constants/tiposCuidados";
import { Cuidado } from "../../domain/entities/Cuidado";
import { CuidadoRepository } from "../../domain/repositories/CuidadoRepository";


// Datos de entrada necesarios para crear un cuidado.
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

    // Validar que el tipo recibido esté dentro de los permitidos.
    if (!esTipoCuidado(tipo)) {
      throw new Error(`Tipo de cuidado inválido: ${tipo}`);
    }

    // Convertir y validar fechaInicio.
    const fechaInicioDate = new Date(fechaInicio);
    if (isNaN(fechaInicioDate.getTime())) {
      throw new Error("FechaInicio no es válida");
    }

    // Convertir y validar fechaFin
    const fechaFinDate = fechaFin ? new Date(fechaFin) : undefined;
    if (fechaFinDate && isNaN(fechaFinDate.getTime())) {
      throw new Error("FechaFin no es válida");
    }

    // Regla de negocio: la fecha final no puede ser anterior a la inicial.
    if (fechaFinDate && fechaFinDate < fechaInicioDate) {
      throw new Error("FechaFin no puede ser anterior a FechaInicio");
    }

    // Buscar todos los cuidados ya registrados para esa planta.
    const cuidados = await this.repo.findCuidadoByPlanta(plantaId);

    for (const c of cuidados) {
      const cFechaInicio = new Date(c.fechaInicio);

      // Regla de negocio: no se puede repetir el mismo tipo de cuidado el mismo día.
      if (
        c.tipo === tipo &&
        cFechaInicio.toDateString() === fechaInicioDate.toDateString()
      ) {
        throw new Error(
          `Ya existe un cuidado de tipo ${tipo} para esta planta en ese día`,
        );
      }

      // Regla de negocio: no se puede regar dentro de las 24h posteriores a una fertilización.
      if (tipo === "Riego" && c.tipo === "Fertilizacion") {
        const diff = fechaInicioDate.getTime() - c.fechaInicio.getTime();

        if (diff >= 0 && diff <= 24 * 60 * 60 * 1000) {
          throw new Error(
            "No se puede regar dentro de las 24h posteriores a una fertilización",
          );
        }
      }
 
      // Regla de negocio: poda y fertilización no pueden ocurrir el mismo día.
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

    // Crear la entidad del dominio con fechas ya convertidas a Date.
    const cuidado = new Cuidado(
      0,
      tipo,
      fechaInicioDate,
      fechaFinDate,
      notas ?? undefined,
    );

    // Guardar el nuevo cuidado asociado a la planta.
    return this.repo.save(cuidado, plantaId);
  }
}