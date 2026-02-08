import { Router } from "express";
import { PlantaRepositoryImpl } from "../../infrastructure/typeorm/repositories/PlantaRepositoryImpl";
import { ObtenerPlantas } from "../../application/use-cases/ObtenerPlantas";
import { ObtenerPlantaPorId } from "../../application/use-cases/ObtenerPlantaPorId";
import { PlantaController } from "../controllers/PlantaController";

const router = Router();

//Dependencias
const plantaRepo = new PlantaRepositoryImpl();
const obtenerPlantas = new ObtenerPlantas(plantaRepo);
const obtenerPlantaPorId = new ObtenerPlantaPorId(plantaRepo);
const controller = new PlantaController(obtenerPlantas, obtenerPlantaPorId);

//Rutas
router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));

export default router;
