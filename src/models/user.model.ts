import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  token: string;

  @Column()
  expires: Date;
}