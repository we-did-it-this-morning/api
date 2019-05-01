import { SeverityModel } from './severity.model';
import { ManyToMany, JoinTable } from 'typeorm';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class PreventionModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(type => SeverityModel, severity => severity.preventions)
  @JoinTable()
  severities: SeverityModel[]
}