import { CuidadoEntity } from "../typeorm/entities/CuidadoEntity";
import { PlantaEntity } from "../typeorm/entities/PlantaEntity";
import { AppDataSource } from "./data-source";

export async function seedDatabase(): Promise<void> {
  const plantaRepo = AppDataSource.getRepository(PlantaEntity);
  const cuidadoRepo = AppDataSource.getRepository(CuidadoEntity);

  const plantasCount = await plantaRepo.count();
  if (plantasCount > 0) {
    console.log("ℹ️ Seed omitido: ya existen plantas");
    return;
  }

  // 🌱 Plantas iniciales
  const monstera = plantaRepo.create({
    nombre: "Monstera",
    especie: "Monstera deliciosa",
    ubicacion: "Sala",
  });

  const aloe = plantaRepo.create({
    nombre: "Aloe",
    especie: "Aloe vera",
    ubicacion: "patio",
  });

  await plantaRepo.save([monstera, aloe]);

  // 💧 Cuidado inicial
  const cuidado = cuidadoRepo.create({
    planta: monstera,
    tipo: "Riego",
    fechaInicio: new Date(),
    notas: "Riego inicial",
  });

  await cuidadoRepo.save(cuidado);
  console.log("🌱 Seed ejecutado: plantas y cuidados creados");
}
