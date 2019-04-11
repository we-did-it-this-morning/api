import { SymptomTypeModel } from './symptom-type.model';
import { MalariaTypeModel } from './malaria-type.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class SymptomModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(type => MalariaTypeModel)
  malariaTypes: MalariaTypeModel[];

  @ManyToOne(type => SymptomTypeModel, symptomType => symptomType.symptoms)
  symptomType: SymptomTypeModel;
}