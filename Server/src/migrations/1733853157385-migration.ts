/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733853157385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            INSERT INTO \`users\` (\`id\`, \`name\`, \`username\`, \`password\`, \`email\`, \`role\`, \`created_at\`, \`updated_at\`, \`deleted_at\`, \`created_by\`, \`updated_by\`, \`deleted_by\`) VALUES
('036fd510-b71e-11ef-8dae-0242ac120010',	'Elijah Harris',	'eli.harris',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'elijah.harris@example.com',	'USER',	'2024-12-10 17:43:14.000000',	'2024-12-10 17:43:14.000000',	NULL,	NULL,	NULL,	NULL),
('136fd511-b71e-11ef-8dae-0242ac120011',	'Harper Martin',	'harper.m',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'harper.martin@example.com',	'USER',	'2024-12-10 17:43:15.000000',	'2024-12-10 17:43:15.000000',	NULL,	NULL,	NULL,	NULL),
('236fd512-b71e-11ef-8dae-0242ac120012',	'Logan Thompson',	'logan.t',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'logan.thompson@example.com',	'USER',	'2024-12-10 17:43:16.000000',	'2024-12-10 17:43:16.000000',	NULL,	NULL,	NULL,	NULL),
('336fd503-b71e-11ef-8dae-0242ac120001',	'Emma Johnson',	'emma.j',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'emma.johnson@example.com',	'USER',	'2024-12-10 17:43:01.000000',	'2024-12-10 17:43:01.000000',	NULL,	NULL,	NULL,	NULL),
('336fd503-b71e-11ef-8dae-0242ac120003',	'vxmt-user',	'user',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	NULL,	'USER',	'2024-12-10 17:43:01.000000',	'2024-12-10 17:43:01.000000',	NULL,	NULL,	NULL,	NULL),
('336fd513-b71e-11ef-8dae-0242ac120013',	'Evelyn Garcia',	'evelyn.g',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'evelyn.garcia@example.com',	'USER',	'2024-12-10 17:43:17.000000',	'2024-12-10 17:43:17.000000',	NULL,	NULL,	NULL,	NULL),
('409deee3-b71e-11ef-8dae-0242ac120003',	'vxmt-admin',	'admin',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	NULL,	'ADMIN',	'2024-12-10 17:43:23.000000',	'2024-12-10 17:43:23.000000',	NULL,	NULL,	NULL,	NULL),
('436fd504-b71e-11ef-8dae-0242ac120004',	'Liam Smith',	'liam.smith',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'liam.smith@example.com',	'USER',	'2024-12-10 17:43:02.000000',	'2024-12-10 17:43:02.000000',	NULL,	NULL,	NULL,	NULL),
('436fd514-b71e-11ef-8dae-0242ac120014',	'Alexander Martinez',	'alex.m',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'alexander.martinez@example.com',	'USER',	'2024-12-10 17:43:18.000000',	'2024-12-10 17:43:18.000000',	NULL,	NULL,	NULL,	NULL),
('536fd505-b71e-11ef-8dae-0242ac120005',	'Olivia Brown',	'olivia.b',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'olivia.brown@example.com',	'USER',	'2024-12-10 17:43:03.000000',	'2024-12-10 17:43:03.000000',	NULL,	NULL,	NULL,	NULL),
('536fd515-b71e-11ef-8dae-0242ac120015',	'Abigail Robinson',	'abby.r',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'abigail.robinson@example.com',	'USER',	'2024-12-10 17:43:19.000000',	'2024-12-10 17:43:19.000000',	NULL,	NULL,	NULL,	NULL),
('636fd506-b71e-11ef-8dae-0242ac120006',	'Noah Williams',	'noah.w',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'noah.williams@example.com',	'USER',	'2024-12-10 17:43:04.000000',	'2024-12-10 17:43:04.000000',	NULL,	NULL,	NULL,	NULL),
('636fd516-b71e-11ef-8dae-0242ac120016',	'Daniel Clark',	'dan.clark',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'daniel.clark@example.com',	'USER',	'2024-12-10 17:43:20.000000',	'2024-12-10 17:43:20.000000',	NULL,	NULL,	NULL,	NULL),
('736fd507-b71e-11ef-8dae-0242ac120007',	'Ava Jones',	'ava.jones',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'ava.jones@example.com',	'USER',	'2024-12-10 17:43:05.000000',	'2024-12-10 17:43:05.000000',	NULL,	NULL,	NULL,	NULL),
('736fd517-b71e-11ef-8dae-0242ac120017',	'Mia Rodriguez',	'mia.r',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'mia.rodriguez@example.com',	'USER',	'2024-12-10 17:43:21.000000',	'2024-12-10 17:43:21.000000',	NULL,	NULL,	NULL,	NULL),
('836fd508-b71e-11ef-8dae-0242ac120008',	'Ethan Davis',	'ethan.d',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'ethan.davis@example.com',	'USER',	'2024-12-10 17:43:06.000000',	'2024-12-10 17:43:06.000000',	NULL,	NULL,	NULL,	NULL),
('836fd518-b71e-11ef-8dae-0242ac120018',	'Jackson Lewis',	'jackson.l',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'jackson.lewis@example.com',	'USER',	'2024-12-10 17:43:22.000000',	'2024-12-10 17:43:22.000000',	NULL,	NULL,	NULL,	NULL),
('936fd509-b71e-11ef-8dae-0242ac120009',	'Sophia Miller',	'sophia.m',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'sophia.miller@example.com',	'USER',	'2024-12-10 17:43:07.000000',	'2024-12-10 17:43:07.000000',	NULL,	NULL,	NULL,	NULL),
('936fd519-b71e-11ef-8dae-0242ac120019',	'Ella Lee',	'ella.lee',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'ella.lee@example.com',	'USER',	'2024-12-10 17:43:23.000000',	'2024-12-10 17:43:23.000000',	NULL,	NULL,	NULL,	NULL),
('a36fd50a-b71e-11ef-8dae-0242ac12000a',	'Mason Wilson',	'mason.wilson',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'mason.wilson@example.com',	'USER',	'2024-12-10 17:43:08.000000',	'2024-12-10 17:43:08.000000',	NULL,	NULL,	NULL,	NULL),
('a36fd51a-b71e-11ef-8dae-0242ac12001a',	'Sebastian Walker',	'seb.walker',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'sebastian.walker@example.com',	'USER',	'2024-12-10 17:43:24.000000',	'2024-12-10 17:43:24.000000',	NULL,	NULL,	NULL,	NULL),
('b36fd50b-b71e-11ef-8dae-0242ac12000b',	'Isabella Taylor',	'isabella.t',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'isabella.taylor@example.com',	'USER',	'2024-12-10 17:43:09.000000',	'2024-12-10 17:43:09.000000',	NULL,	NULL,	NULL,	NULL),
('b36fd51b-b71e-11ef-8dae-0242ac12001b',	'Avery Hall',	'avery.h',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'avery.hall@example.com',	'USER',	'2024-12-10 17:43:25.000000',	'2024-12-10 17:43:25.000000',	NULL,	NULL,	NULL,	NULL),
('c36fd50c-b71e-11ef-8dae-0242ac12000c',	'James Anderson',	'james.a',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'james.anderson@example.com',	'USER',	'2024-12-10 17:43:10.000000',	'2024-12-10 17:43:10.000000',	NULL,	NULL,	NULL,	NULL),
('d36fd50d-b71e-11ef-8dae-0242ac12000d',	'Charlotte Thomas',	'charlotte.t',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'charlotte.thomas@example.com',	'USER',	'2024-12-10 17:43:11.000000',	'2024-12-10 17:43:11.000000',	NULL,	NULL,	NULL,	NULL),
('e36fd50e-b71e-11ef-8dae-0242ac12000e',	'Benjamin Jackson',	'ben.j',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'benjamin.jackson@example.com',	'USER',	'2024-12-10 17:43:12.000000',	'2024-12-10 17:43:12.000000',	NULL,	NULL,	NULL,	NULL),
('f36fd50f-b71e-11ef-8dae-0242ac12000f',	'Amelia White',	'amelia.w',	'$2b$13$uiiLWTmBd8t6sMwgnMkQg.pXb6HsxitJX9EzXsBZHgcWvlK4ViVc6',	'amelia.white@example.com',	'USER',	'2024-12-10 17:43:13.000000',	'2024-12-10 17:43:13.000000',	NULL,	NULL,	NULL,	NULL);
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
