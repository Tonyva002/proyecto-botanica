import { Request, Response } from "express";
import { CrearCuidado } from "../../application/use-cases/CrearCuidado";
import { ListarCuidados } from "../../application/use-cases/ListarCuidados";

export class CuidadoController {
  constructor(
    private crearCuidado: CrearCuidado,
    private listarCuidados: ListarCuidados,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { plantaId, tipo, fechaInicio, fechaFin, notas } = req.body;

      if (!plantaId || !tipo || !fechaInicio) {
        return res.status(400).json({
          error: "plantaId, tipo y fechaInicio son obligatorios",
        });
      }

      const cuidado = await this.crearCuidado.execute({
        plantaId: Number(plantaId),
        tipo,
        fechaInicio,
        fechaFin: fechaFin ?? null,
        notas: notas ?? null,
      });

      return res.status(201).json(cuidado);
    } catch (e: any) {
      return res
        .status(400)
        .json({ error: e.message || "Error al crear cuidado" });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    const plantaId = Number(req.query.plantaId);

    if (!plantaId) {
      return res.status(400).json({ error: "plantaId es requerido" });
    }

    const cuidados = await this.listarCuidados.execute(plantaId);
    return res.json(cuidados);
  }
}
