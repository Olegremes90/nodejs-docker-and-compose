"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveNotNullDescription1747490123316 = void 0;
class RemoveNotNullDescription1747490123316 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE public.wishlist
      ALTER COLUMN description DROP NOT NULL;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE public.wishlist
      ALTER COLUMN descrription SET NOT NULL;
    `);
    }
}
exports.RemoveNotNullDescription1747490123316 = RemoveNotNullDescription1747490123316;
//# sourceMappingURL=1747490123316-removeNotNullDescription.js.map