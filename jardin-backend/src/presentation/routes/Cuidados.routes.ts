import { Router } from "express";
import { CuidadoRepositoryImpl } from "../../infrastructure/typeorm/repositories/CuidadoRepositoryImpl";
import { CrearCuidado } from "../../application/use-cases/CrearCuidado";
import { ListarCuidados } from "../../application/use-cases/ListarCuidados";
import { CuidadoController } from "../controllers/CuidadoController";

const router = Router();

const repo = new CuidadoRepositoryImpl();
const crear = new CrearCuidado(repo);
const listar = new ListarCuidados(repo);

const controller = new CuidadoController(crear, listar);

router.post("/", (req, res) => controller.create(req, res));
router.get("/", (req, res) => controller.list(req, res));

export default router;
