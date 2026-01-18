import { PlantaApiDataSource } from "../../data/datasources/PlantaApiDataSource";
import { PlantaRepositoryImpl } from "../../data/repositories/PlantaRepositoryImpl";
import { GetPlantaByIdUseCase } from "../../domain/useCases/GetPlantaByIdUseCase";
import { GetPlantasUseCase } from "../../domain/useCases/GetPlantasUseCase";

// Infraestructura
const plantaApiDataSource = new PlantaApiDataSource();

// Repository
const plantaRepository = new PlantaRepositoryImpl(plantaApiDataSource);

// Use Cases
export const getPlantasUseCase = new GetPlantasUseCase(plantaRepository);
export const getPlantaByIdUseCase = new GetPlantaByIdUseCase(plantaRepository);
