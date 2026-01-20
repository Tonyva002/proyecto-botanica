import "reflect-metadata";
import express from "express";
import cors from "cors";

import { AppDataSource } from "./infrastructure/database/data-source";
import { seedDatabase } from "./infrastructure/database/seed";

import plantasRouter from "./presentation/routes/plantas.routes";
import cuidadosRouter from "./presentation/routes/Cuidados.routes";

const PORT = 4000;

/**
 * Inicializa la conexión a la base de datos y arranca el servidor Express.
 */
async function start() {
  let connected = false;

  // Bucle de reintento para la conexión a la base de datos (DB)
  while (!connected) {
    try {
      await AppDataSource.initialize();
      connected = true;
      console.log("✅ Conectado a la base de datos");
    } catch (error) {
      console.error("❌ Error de conexión, reintentando en 3s...");
      // Espera 3 segundos antes de reintentar la conexión
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  // Ejecuta la siembra inicial de datos (seed)
  await seedDatabase();
  console.log("🌱 Datos iniciales cargados (seed ejecutado)");

  // Configuración de Express
  const app = express();

  // Middleware para parsear JSON en el cuerpo de las solicitudes
  app.use(express.json());

  // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    }),
  );

  // Rutas de la API
  app.use("/api/plantas", plantasRouter);
  app.use("/api/cuidados", cuidadosRouter);

  // 🩺 Health check
  app.get("/health", (_, res) => {
    res.json({ status: "OK" });
  });

  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Llama a la función para iniciar todo
start().catch((error) => {
  console.error("💥 Error crítico al iniciar la app", error);
  process.exit(1);
});
