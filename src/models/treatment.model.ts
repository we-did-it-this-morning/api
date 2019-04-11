import { MalariaTypeModel } from './malaria-type.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { TreatmentTypeModel } from './treatment-type.model';

@Entity()
export class TreatmentModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(type => MalariaTypeModel)
  malariaType: MalariaTypeModel[];

  @ManyToOne(type => TreatmentTypeModel, treatmentType => treatmentType.treatments)
  treatmentType: TreatmentTypeModel;
}