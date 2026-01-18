import { AppDataSource } from "../data-source";
import { Cuidado } from "../entities/Cuidado";

export class CuidadoService {
  private repo = AppDataSource.getRepository(Cuidado);

  // Validar reglas principales
  async validarReglas(plantaId: number, tipo: string, fechaInicio: Date): Promise<string[]> {
    const errores: string[] = [];

    // Obtener todos los cuidados de la planta
    const cuidados = await this.repo.find({
      where: { planta: { id: plantaId } },
      relations: ["planta"]
    });

    for (const c of cuidados) {
      const cFechaInicio = new Date(c.fechaInicio);

      // Regla 1: Riego vs Fertilización
      if (tipo === "Riego" && c.tipo === "Fertilización") {
        const diff = fechaInicio.getTime() - cFechaInicio.getTime();
        if (diff >= 0 && diff <= 24 * 60 * 60 * 1000) {
          errores.push(`No se puede regar dentro de las 24h posteriores a una fertilización (${cFechaInicio.toISOString()})`);
        }
      }

      // Regla 2: Poda y Fertilización no el mismo día
      if (
        (tipo === "Poda" && c.tipo === "Fertilización") ||
        (tipo === "Fertilización" && c.tipo === "Poda")
      ) {
        const sameDay = fechaInicio.toDateString() === cFechaInicio.toDateString();
        if (sameDay) {
          errores.push(`Poda y fertilización no pueden ocurrir el mismo día (${cFechaInicio.toISOString()})`);
        }
      }
    }

    return errores;
  }

  // Validar FechaFin >= FechaInicio. 
  validarFechas(fechaInicio: Date, fechaFin: Date): string | null {
    if (fechaFin < fechaInicio) {
      return "FechaFin no puede ser anterior a FechaInicio";
    }
    return null;
  }

  // Sugerencia de fechas para el calendario
  async sugerirFechas(
    plantaId: number,
    tipo: string,
    fechaInicio: Date,
    fechaFin: Date,
    intervaloDias: number
  ): Promise<Date[]> {
    const sugerencias: Date[] = [];
    let fechaActual = new Date(fechaInicio);

    while (fechaActual <= fechaFin) {
      const errores = await this.validarReglas(plantaId, tipo, fechaActual);
      if (errores.length === 0) {
        sugerencias.push(new Date(fechaActual));
      }
      fechaActual.setDate(fechaActual.getDate() + intervaloDias);
    }

    return sugerencias;
  }

  // Crear un cuidado (con validación)
  async crearCuidado(plantaId: number, tipo: string, fechaInicio: Date, fechaFin?: Date): Promise<Cuidado> {
    if (fechaFin) {
      const errorFechas = this.validarFechas(fechaInicio, fechaFin);
      if (errorFechas) throw new Error(errorFechas);
    }

    const errores = await this.validarReglas(plantaId, tipo, fechaInicio);
    if (errores.length > 0) {
      throw new Error(errores.join("; "));
    }

    const cuidado = this.repo.create({
      planta: { id: plantaId },
      tipo,
      fechaInicio,
      fechaFin: fechaFin || fechaInicio,
    });

    return this.repo.save(cuidado);
  }
}
