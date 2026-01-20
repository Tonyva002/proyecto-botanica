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

  @Column({ type: "date" })
  fechaInicio!: Date;

  @Column({ type: "date", nullable: true })
  fechaFin?: Date;

  @Column({ type: "text", nullable: true })
  notas?: string;

  @ManyToOne(() => PlantaEntity, (planta) => planta.cuidados, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "plantaId" })
  planta!: PlantaEntity;
}
