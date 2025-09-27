import { AppDataSource } from "../data-source";
import { Planta } from "../entities/Planta";
import { Cuidado } from "../entities/Cuidado";

export async function seed() {
  const repoPlantas = AppDataSource.getRepository(Planta);
  const repoCuidados = AppDataSource.getRepository(Cuidado);

  const count = await repoPlantas.count();
  if (count === 0) {
    const monstera = repoPlantas.create({
      nombre: "Monstera",
      especie: "Monstera deliciosa",
      ubicacion: "Sala"
    });
    const aloe = repoPlantas.create({
      nombre: "Aloe",
      especie: "Aloe vera",
      ubicacion: "Cocina"
    });

    await repoPlantas.save([monstera, aloe]);

    const cuidado = repoCuidados.create({
      planta: monstera,
      tipo: "Riego",
      fechaInicio: new Date(),
      notas: "Riego inicial"
    });
    await repoCuidados.save(cuidado);
  }
}
