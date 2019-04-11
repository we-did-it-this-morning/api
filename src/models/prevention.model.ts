import { SeverityModel } from './severity.model';
import { ManyToMany } from 'typeorm';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class PreventionModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(type => SeverityModel)
  severities: SeverityModel[]
}