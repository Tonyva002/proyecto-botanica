import { Cuidado } from "../../domain/entities/Cuidado";
import {
  CreateCuidadoPayload,
  CuidadoRepository,
} from "../../domain/repositories/CuidadoRepository";
import CuidadoApiDataSource from "../datasources/CuidadoApiDataSource";

export class CuidadoRepositoryImpl implements CuidadoRepository {
  constructor(private dataSource: CuidadoApiDataSource) {}
  findByPlanta(plantaId: number): Promise<Cuidado[]> {
    return this.dataSource.getByPlanta(plantaId);
  }
  create(payload: CreateCuidadoPayload): Promise<Cuidado> {
    return this.dataSource.create(payload);
  }
}
