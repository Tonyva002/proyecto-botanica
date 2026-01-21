import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PlantaEntity } from "./PlantaEntity";

@Entity({ name: "cuidado" })
export class CuidadoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 80 })
  tipo!: string;

  @Column({ type: "datetime" })
  fechaInicio!: Date;

  @Column({ type: "datetime", nullable: true })
  fechaFin?: Date | null;

  @Column({ type: "text", nullable: true })
  notas?: string | null;

  @ManyToOne(() => PlantaEntity, (planta) => planta.cuidados, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "plantaId" })
  planta!: PlantaEntity;
}
