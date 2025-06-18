import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { Wish } from './wish.entity';
import { User } from './user.entity';
@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ length: 250, type: 'varchar' })
  @Length(1, 250)
  name: string;
  @Column({ length: 1500, type: 'varchar', nullable: true })
  description: string | null;
  @Column({ length: 250, type: 'varchar' })
  image: string;
  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  wishes: Wish[];
  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  author: User;
}
