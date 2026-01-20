import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { CuidadoEntity } from "./CuidadoEntity";

@Entity({ name: "planta" })
export class PlantaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 100 })
  especie!: string;

  @Column({ length: 100, nullable: true })
  ubicacion?: string;

  @CreateDateColumn({ type: "timestamp" })
  fechaRegistro!: Date;

  @OneToMany(() => CuidadoEntity, (cuidado) => cuidado.planta, {
    cascade: true,
  })
  cuidados!: CuidadoEntity[];
}
