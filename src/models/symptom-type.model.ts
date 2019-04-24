import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SymptomModel } from "./symptom.model";

@Entity()
export class SymptomTypeModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @OneToMany(type => SymptomModel, symptom => symptom.symptomType)
  symptoms: SymptomModel[];
}