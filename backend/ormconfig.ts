// ormconfig.ts
import { DataSource } from 'typeorm';
import {Wish} from "./src/entity/wish.entity";
import {User} from "./src/entity/user.entity";
import {Wishlist} from "./src/entity/wishlist.entity";
import {Offer} from "./src/entity/offer.entity";
import * as dotenv from 'dotenv';
dotenv.config();
export const AppDataSource = new DataSource({
    type: process.env.DATABASE_TYPE as 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Wish, Offer, Wishlist],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
});

