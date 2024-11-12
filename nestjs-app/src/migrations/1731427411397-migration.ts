import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731427411397 implements MigrationInterface {
  name = 'Migration1731427411397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`id\` varchar(36) NOT NULL, \`account_number\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`current_balance\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_by\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_by\` varchar(255) NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loans\` (\`id\` varchar(36) NOT NULL, \`loan_amount\` int NOT NULL, \`interest_rate\` int NOT NULL, \`term\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_by\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loan_payments\` (\`id\` varchar(36) NOT NULL, \`scheduled_payment_date\` datetime NOT NULL, \`total_payment_amount\` int NOT NULL, \`principal_amount\` int NOT NULL, \`interest_amount\` int NOT NULL, \`paid_amount\` int NOT NULL, \`paid_date\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`loan_payments\``);
    await queryRunner.query(`DROP TABLE \`loans\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`accounts\``);
  }
}
