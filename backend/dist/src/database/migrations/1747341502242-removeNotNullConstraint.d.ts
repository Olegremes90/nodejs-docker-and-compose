import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RemoveNotNullConstraint1747341502242 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
