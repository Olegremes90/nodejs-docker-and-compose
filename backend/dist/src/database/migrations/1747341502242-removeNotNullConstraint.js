"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveNotNullConstraint1747341502242 = void 0;
class RemoveNotNullConstraint1747341502242 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE public.wish
      ALTER COLUMN raised DROP NOT NULL;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE public.wish
      ALTER COLUMN raised SET NOT NULL;
    `);
    }
}
exports.RemoveNotNullConstraint1747341502242 = RemoveNotNullConstraint1747341502242;
//# sourceMappingURL=1747341502242-removeNotNullConstraint.js.map