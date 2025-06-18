import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Wish } from './wish.entity';
@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;
  @ManyToOne(() => Wish, (wish) => wish.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  wish: Wish;
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;
  @Column({ default: false })
  hidden: boolean;
}
