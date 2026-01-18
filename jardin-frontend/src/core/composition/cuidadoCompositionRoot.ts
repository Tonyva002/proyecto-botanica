import CuidadoApiDataSource from "../../data/datasources/CuidadoApiDataSource";
import { CuidadoRepositoryImpl } from "../../data/repositories/CuidadoRepositoryImpl";
import { CreateCuidadoUseCase } from "../../domain/useCases/CreateCuidadoUseCase";
import { GetCuidadosUseCase } from "../../domain/useCases/GetCuidadosUseCase";

//Infraestructura
const cuidadoApiDataSource = new CuidadoApiDataSource();

//Repository
const cuidadoRepository = new CuidadoRepositoryImpl(cuidadoApiDataSource);

// Use Cases
export const getCuidadosUseCase = new GetCuidadosUseCase(cuidadoRepository);

export const createCuidadoUseCase = new CreateCuidadoUseCase(cuidadoRepository);
