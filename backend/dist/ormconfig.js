"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const wish_entity_1 = require("./src/entity/wish.entity");
const user_entity_1 = require("./src/entity/user.entity");
const wishlist_entity_1 = require("./src/entity/wishlist.entity");
const offer_entity_1 = require("./src/entity/offer.entity");
const dotenv = require("dotenv");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [user_entity_1.User, wish_entity_1.Wish, offer_entity_1.Offer, wishlist_entity_1.Wishlist],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
});
//# sourceMappingURL=ormconfig.js.map