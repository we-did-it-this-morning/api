import { TreatmentModel } from './treatment.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class TreatmentTypeModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @OneToMany(type => TreatmentModel, treatment => treatment.treatmentType)
  treatments: TreatmentModel[];
}