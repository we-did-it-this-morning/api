import { Entity, PrimaryColumn, Column, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { PreventionModel } from "./prevention.model";
import { MalariaTypeModel } from './malaria-type.model';

@Entity()
export class SeverityModel {
  @PrimaryColumn()
  level: number;

  @Column()
  description: string;

  @ManyToMany(type => PreventionModel)
  preventions: PreventionModel[];

  @OneToMany(type => MalariaTypeModel, m => m.severity)
  malariaType: MalariaTypeModel;

}