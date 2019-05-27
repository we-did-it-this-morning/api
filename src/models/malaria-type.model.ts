import { SymptomModel } from './symptom.model';
import { CountryModel } from './country.model';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { SeverityModel } from './severity.model';
import { TreatmentModel } from './treatment.model';

@Entity()
export class MalariaTypeModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(type => SeverityModel)
  severity: SeverityModel;

  @ManyToMany(type => CountryModel, cm => cm.malariaTypes)
  countries: CountryModel[];

  @ManyToMany(type => SymptomModel, sm => sm.malariaTypes)
  @JoinTable()
  symptoms: SymptomModel[];

  @ManyToMany(type => TreatmentModel, tm => tm.malariaType)
  @JoinTable()
  treatments: TreatmentModel[];
}