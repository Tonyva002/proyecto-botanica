import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Cuidado } from "../entities/Cuidado";
import { Planta } from "../entities/Planta";
import { CuidadoService } from "../services/cuidadoService";

const router = Router();
const cuidadoService = new CuidadoService();

// Listar todos los cuidados
router.get("/", async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Cuidado);
    const cuidados = await repo.find({ relations: ["planta"] });
    res.json(cuidados);
  } catch (error) {
    res.status(500).json({ error: "Error al listar cuidados", details: error });
  }
});

// Crear un cuidado
router.post("/", async (req, res) => {
  try {
    const { plantaId, tipo, fechaInicio, fechaFin, notas } = req.body;

    // Verificar que la planta exista
    const plantaRepo = AppDataSource.getRepository(Planta);
    const planta = await plantaRepo.findOneBy({ id: plantaId });
    if (!planta) return res.status(404).json({ error: "Planta no encontrada" });

    // Validar reglas de cuidado
    const errores = await cuidadoService.validarReglas(
      plantaId,
      tipo,
      new Date(fechaInicio)
    );
    if (errores.length > 0) return res.status(400).json({ errores });

    // Crear cuidado
    const repo = AppDataSource.getRepository(Cuidado);
    const cuidado = repo.create({
      planta, // aquí usamos la entidad completa
      tipo,
      fechaInicio: new Date(fechaInicio),
      fechaFin: fechaFin ? new Date(fechaFin) : undefined,
      notas,
    });

    await repo.save(cuidado);
    res.status(201).json(cuidado);
  } catch (error) {
    res.status(500).json({ error: "Error al crear cuidado", details: error });
  }
});

export default router;
