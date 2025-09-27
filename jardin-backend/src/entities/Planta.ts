import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Cuidado } from "./Cuidado";

@Entity()
export class Planta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  especie!: string;

  @Column({ nullable: true })
  ubicacion?: string;

  @CreateDateColumn()
  fechaRegistro!: Date;

  @OneToMany(() => Cuidado, (cuidado) => cuidado.planta)
  cuidados!: Cuidado[];
}
