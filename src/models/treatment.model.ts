import { MalariaTypeModel } from './malaria-type.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { TreatmentTypeModel } from './treatment-type.model';

@Entity()
export class TreatmentModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(type => MalariaTypeModel, mt => mt.treatments)
  malariaType: MalariaTypeModel[];

  @ManyToOne(type => TreatmentTypeModel, treatmentType => treatmentType.treatments)
  treatmentType: TreatmentTypeModel;
}