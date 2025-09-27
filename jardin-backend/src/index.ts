import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import plantasRouter from "./routes/plantas";
import cuidadosRouter from "./routes/cuidados";
import { seed } from "./seed";
import cors from "cors";

/**
 * Inicializa la conexión a la base de datos y arranca el servidor Express.
 */
async function startServer() {
  let connected = false;

  // Bucle de reintento para la conexión a la base de datos (DB)
  while (!connected) {
    try {
      await AppDataSource.initialize();
      connected = true;
      console.log("✅ Conectado a MySQL usando TypeORM");
    } catch (error) {
      console.error("❌ Error de conexión, reintentando en 3s...");
      // Espera 3 segundos antes de reintentar la conexión
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  // Ejecuta la siembra inicial de datos (seed)
  await seed(); 
  console.log("🌱 Datos iniciales cargados (seed ejecutado)");

  // Configuración de Express
  const app = express();
  
  // Middleware para parsear JSON en el cuerpo de las solicitudes
  app.use(express.json());
  
  // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
  app.use(cors({
      // Permite todas las fuentes, si necesitas restringir, usa origin: ['http://localhost:3000']
      origin: '*', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
  }));

  // Rutas de la API
  app.use("/api/plantas", plantasRouter);
  app.use("/api/cuidados", cuidadosRouter);

  // Iniciar el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Llama a la función para iniciar todo
startServer();
