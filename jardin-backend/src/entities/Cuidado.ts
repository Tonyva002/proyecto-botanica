import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Planta } from "./Planta";

@Entity()
export class Cuidado {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Planta, (planta) => planta.cuidados)
  planta!: Planta;

  @Column()
  tipo!: string; // Riego | Poda | Fertilización | Luz

  @Column()
  fechaInicio!: Date;

  @Column({ nullable: true })
  fechaFin!: Date;

  @Column({ nullable: true })
  notas!: string;
}
