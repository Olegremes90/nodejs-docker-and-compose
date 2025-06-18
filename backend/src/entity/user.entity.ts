import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ unique: true, length: 30 })
  @Length(2, 30)
  username: string;
  @Column({
    type: 'varchar',
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  about: string;
  @Column({ type: 'varchar', default: 'https://i.pravatar.cc/300' })
  @Length(2, 200)
  avatar: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
}
