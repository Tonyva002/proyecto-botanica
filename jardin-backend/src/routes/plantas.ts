
import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Planta } from "../entities/Planta";
import { ILike } from "typeorm";

const router = Router();

/**
 * GET /plantas?q=nombre
 * Lista todas las plantas, opcionalmente filtrando por nombre
 */
router.get("/", async (req, res) => {
  try {
    const q = req.query.q?.toString() || "";
    const repo = AppDataSource.getRepository(Planta);

    const plantas = await repo.find({
      where: q ? { nombre: ILike(`%${q}%`) } : {},
    });

    res.json(plantas);
  } catch (error) {
    console.error("❌ Error en GET /plantas", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/**
 * GET /plantas/:id
 * Devuelve una planta por ID con sus cuidados
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const repo = AppDataSource.getRepository(Planta);
    const planta = await repo.findOne({
      where: { id },
      relations: ["cuidados"], // incluye los cuidados relacionados
    });

    if (!planta) {
      return res.status(404).json({ error: "Planta no encontrada" });
    }

    res.json(planta);
  } catch (error) {
    console.error("❌ Error en GET /plantas/:id", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;


