import { Request, Response } from "express";
import { ObtenerPlantas } from "../../application/use-cases/ObtenerPlnatas";
import { ObtenerPlantaPorId } from "../../application/use-cases/ObtenerPlantaPorId";

export class PlantaController {
  constructor(
    private obtenerPlantas: ObtenerPlantas,
    private obtenerPlantaPorId: ObtenerPlantaPorId,
  ) {}

  async getAll(req: Request, res: Response) {
    try {
      const { nombre } = req.query;
      const plantas = await this.obtenerPlantas.execute(nombre?.toString());
      res.json(plantas);
    } catch (e) {
      res.status(500).json({ error: "Error obteniendo plantas" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const planta = await this.obtenerPlantaPorId.execute(id);

      if (!planta) {
        return res.status(404).json({ error: "Planta no encontrada" });
      }

      res.json(planta);
    } catch (e) {
      res.status(500).json({ error: "Error obteniendo planta" });
    }
  }
}
