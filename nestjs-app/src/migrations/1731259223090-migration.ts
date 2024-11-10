import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731259223090 implements MigrationInterface {
  name = 'Migration1731259223090';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
  }
}
