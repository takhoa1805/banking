import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731641375325 implements MigrationInterface {
  name = 'Migration1731641375325';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_by\` varchar(255) NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loan_payments\` (\`id\` varchar(36) NOT NULL, \`scheduled_payment_date\` datetime NOT NULL, \`total_payment_amount\` int NOT NULL, \`principal_amount\` int NOT NULL, \`interest_amount\` int NOT NULL, \`paid_amount\` int NOT NULL, \`paid_date\` datetime NULL, \`loan_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loans\` (\`id\` varchar(36) NOT NULL, \`loan_amount\` int NOT NULL, \`interest_rate\` int NOT NULL, \`term\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_by\` varchar(255) NULL, \`account_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`id\` varchar(36) NOT NULL, \`account_number\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`current_balance\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_by\` varchar(255) NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`transactions\` (\`id\` varchar(36) NOT NULL, \`type\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`account_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan_payments\` ADD CONSTRAINT \`FK_6584bab09ac53bd8d00d74a58cd\` FOREIGN KEY (\`loan_id\`) REFERENCES \`loans\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loans\` ADD CONSTRAINT \`FK_4ca248baa776dbc6864eb6747f5\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_3000dad1da61b29953f07476324\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_49c0d6e8ba4bfb5582000d851f0\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_49c0d6e8ba4bfb5582000d851f0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_3000dad1da61b29953f07476324\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loans\` DROP FOREIGN KEY \`FK_4ca248baa776dbc6864eb6747f5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan_payments\` DROP FOREIGN KEY \`FK_6584bab09ac53bd8d00d74a58cd\``,
    );
    await queryRunner.query(`DROP TABLE \`transactions\``);
    await queryRunner.query(`DROP TABLE \`accounts\``);
    await queryRunner.query(`DROP TABLE \`loans\``);
    await queryRunner.query(`DROP TABLE \`loan_payments\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
