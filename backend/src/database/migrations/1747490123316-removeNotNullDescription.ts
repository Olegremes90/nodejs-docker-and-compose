import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNotNullDescription1747490123316
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.wishlist
      ALTER COLUMN description DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.wishlist
      ALTER COLUMN descrription SET NOT NULL;
    `);
  }
}
