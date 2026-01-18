import { Cuidado } from "../../domain/entities/Cuidado";
import {
  CreateCuidadoPayload,
  CuidadoRepository,
} from "../../domain/repositories/CuidadoRepository";
import CuidadoApiDataSource from "../datasources/CuidadoApiDataSource";

export class CuidadoRepositoryImpl implements CuidadoRepository {
  constructor(private dataSource: CuidadoApiDataSource) {}
  getAll(): Promise<Cuidado[]> {
    return this.dataSource.getAll();
  }
  create(payload: CreateCuidadoPayload): Promise<Cuidado> {
    return this.dataSource.create(payload);
  }
}
