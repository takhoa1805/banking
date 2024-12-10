import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733856142056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS number_count (
            id INT AUTO_INCREMENT,
            count INT,
            PRIMARY KEY (id));`);
    await queryRunner.query(
      `INSERT INTO number_count (count) VALUES (10000000)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE number_count;`);
  }
}
