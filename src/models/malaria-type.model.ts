import { SymptomModel } from './symptom.model';
import { CountryModel } from './country.model';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class MalariaTypeModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => CountryModel)
  countries: CountryModel[];

  @ManyToMany(type => SymptomModel)
  @JoinTable()
  symptoms: SymptomModel[];
}