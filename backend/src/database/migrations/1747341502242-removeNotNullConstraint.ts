import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNotNullConstraint1747341502242
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.wish
      ALTER COLUMN raised DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.wish
      ALTER COLUMN raised SET NOT NULL;
    `);
  }
}
