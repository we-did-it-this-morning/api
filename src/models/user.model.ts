import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    unique: true
  })
  username: string;

  @Column()
  passwordHash: string;

  @Column({
    nullable: true
  })
  token: string;

  @Column({
    nullable: true
  })
  expires: Date;
}