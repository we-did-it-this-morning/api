import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm";
import { PreventionModel } from "./prevention.model";

@Entity()
export class SeverityModel {
  @PrimaryColumn()
  level: number;

  @Column()
  description: string;

  @ManyToMany(type => PreventionModel)
  preventions: PreventionModel[];

}