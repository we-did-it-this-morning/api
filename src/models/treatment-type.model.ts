import { TreatmentModel } from './treatment.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class TreatmentTypeModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(type => TreatmentModel, treatment => treatment.treatmentType)
  treatments: TreatmentModel[];
}