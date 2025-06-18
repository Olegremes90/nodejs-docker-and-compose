import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRaisedDefault1747852578374 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "wish"
            ALTER COLUMN "raised" SET DEFAULT 0
        `);
    await queryRunner.query(`
            ALTER TABLE "wish"
            ALTER COLUMN "copied" SET DEFAULT 0
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
