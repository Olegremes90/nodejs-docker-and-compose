"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRaisedDefault1747852578374 = void 0;
class UpdateRaisedDefault1747852578374 {
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "wish"
            ALTER COLUMN "raised" SET DEFAULT 0
        `);
        await queryRunner.query(`
            ALTER TABLE "wish"
            ALTER COLUMN "copied" SET DEFAULT 0
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "wish"
            ALTER COLUMN "raised" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "wish"
                ALTER COLUMN "copied" DROP DEFAULT
        `);
    }
}
exports.UpdateRaisedDefault1747852578374 = UpdateRaisedDefault1747852578374;
//# sourceMappingURL=1747852578374-UpdateRaisedDefault.js.map