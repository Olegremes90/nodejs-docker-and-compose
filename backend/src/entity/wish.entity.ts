import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from './user.entity';
import { Wishlist } from './wishlist.entity';
@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ length: 250, type: 'varchar' })
  @Length(1, 250)
  name: string;
  @Column({ type: 'varchar' })
  link: string;
  @Column({ type: 'varchar' })
  image: string;
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  raised: number;
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  copied: number;
  @ManyToOne(() => User, (user) => user.id)
  owner: User;
  @Column({ length: 1024 })
  @Length(1, 1024)
  description: string;
  @ManyToMany(() => Wishlist, (wishlist) => wishlist.wishes)
  @JoinTable()
  wishlists: Wishlist[];
}
