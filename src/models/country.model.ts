import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column } from "typeorm";
import { MalariaTypeModel } from "./malaria-type.model";

@Entity()
export class CountryModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => MalariaTypeModel)
  @JoinTable()
  malariaTypes: MalariaTypeModel[];
}