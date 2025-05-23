/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733859602747 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`accounts\` (\`id\`, \`account_number\`, \`current_balance\`, \`status\`, \`created_at\`, \`updated_at\`, \`deleted_at\`, \`created_by\`, \`updated_by\`, \`deleted_by\`, \`user_id\`) VALUES 
('af1a7e21-7915-40b0-b559-c21832ff5140', '20000001', 100000, 'PENDING', '2024-07-10 18:52:21.538660', '2024-07-10 18:52:21.538660', NULL, '436fd514-b71e-11ef-8dae-0242ac120014', NULL, NULL, '436fd514-b71e-11ef-8dae-0242ac120014'),
('bb2b8f32-6a26-51c1-c670-d32943ff6251', '20000002', 250000, 'ACTIVE', '2024-07-11 09:15:33.221445', '2024-07-11 09:15:33.221445', NULL, '436fd514-b71e-11ef-8dae-0242ac120014', NULL, NULL, '436fd514-b71e-11ef-8dae-0242ac120014'),
('cc3c9g43-7b37-62d2-d781-e43a54gg7362', '20000003', 50000, 'SUSPENDED', '2024-07-12 14:30:45.112233', '2024-07-12 14:30:45.112233', NULL, '436fd514-b71e-11ef-8dae-0242ac120014', NULL, NULL, '436fd514-b71e-11ef-8dae-0242ac120014'),
('dd4d0h54-8c48-73e3-e892-f54b65hh8473', '20000004', 75000, 'ACTIVE', '2024-08-13 11:22:44.334455', '2024-08-13 11:22:44.334455', NULL, 'f36fd50f-b71e-11ef-8dae-0242ac12000f', NULL, NULL, 'f36fd50f-b71e-11ef-8dae-0242ac12000f'),
('ee5e1i65-9d59-84f4-f903-g65c76ii9584', '20000005', 300000, 'PENDING', '2024-08-14 16:45:56.445566', '2024-08-14 16:45:56.445566', NULL, 'f36fd50f-b71e-11ef-8dae-0242ac12000f', NULL, NULL, 'f36fd50f-b71e-11ef-8dae-0242ac12000f'),
('ff6f2j76-0e60-95g5-g014-h76d87jj0695', '20000006', 125000, 'ACTIVE', '2024-08-15 10:33:22.556677', '2024-08-15 10:33:22.556677', NULL, 'f36fd50f-b71e-11ef-8dae-0242ac12000f', NULL, NULL, 'f36fd50f-b71e-11ef-8dae-0242ac12000f'),
('gg7g3k87-1f71-06h6-h125-i87e98kk1706', '20000007', 200000, 'ACTIVE', '2024-09-16 13:44:11.667788', '2024-09-16 13:44:11.667788', NULL, '736fd507-b71e-11ef-8dae-0242ac120007', NULL, NULL, '736fd507-b71e-11ef-8dae-0242ac120007'),
('hh8h4l98-2g82-17i7-i236-j98f09ll2817', '20000008', 90000, 'SUSPENDED', '2024-09-17 15:55:33.778899', '2024-09-17 15:55:33.778899', NULL, '736fd507-b71e-11ef-8dae-0242ac120007', NULL, NULL, '736fd507-b71e-11ef-8dae-0242ac120007'),
('ii9i5m09-3h93-28j8-j347-k09g10mm3928', '20000009', 175000, 'PENDING', '2024-09-18 09:11:44.889900', '2024-09-18 09:11:44.889900', NULL, '736fd507-b71e-11ef-8dae-0242ac120007', NULL, NULL, '736fd507-b71e-11ef-8dae-0242ac120007'),
('jj0j6n10-4i04-39k9-k458-l10h21nn4039', '20000010', 150000, 'ACTIVE', '2024-10-19 17:22:55.990011', '2024-10-19 17:22:55.990011', NULL, 'b36fd51b-b71e-11ef-8dae-0242ac12001b', NULL, NULL, 'b36fd51b-b71e-11ef-8dae-0242ac12001b'),
('kk1k7o21-5j15-40l0-l569-m21i32oo5140', '20000011', 80000, 'PENDING', '2024-10-20 12:33:11.001122', '2024-10-20 12:33:11.001122', NULL, 'b36fd51b-b71e-11ef-8dae-0242ac12001b', NULL, NULL, 'b36fd51b-b71e-11ef-8dae-0242ac12001b'),
('ll2l8p32-6k26-51m1-m670-n32j43pp6251', '20000012', 225000, 'SUSPENDED', '2024-10-21 14:44:22.112233', '2024-10-21 14:44:22.112233', NULL, 'b36fd51b-b71e-11ef-8dae-0242ac12001b', NULL, NULL, 'b36fd51b-b71e-11ef-8dae-0242ac12001b'),
('mm3m9q43-7l37-62n2-n781-o43k54qq7362', '20000013', 110000, 'ACTIVE', '2024-11-22 16:55:33.223344', '2024-11-22 16:55:33.223344', NULL, 'e36fd50e-b71e-11ef-8dae-0242ac12000e', NULL, NULL, 'e36fd50e-b71e-11ef-8dae-0242ac12000e'),
('nn4n0r54-8m48-73o3-o892-p54l65rr8473', '20000014', 260000, 'PENDING', '2024-11-23 10:11:44.334455', '2024-11-23 10:11:44.334455', NULL, 'e36fd50e-b71e-11ef-8dae-0242ac12000e', NULL, NULL, 'e36fd50e-b71e-11ef-8dae-0242ac12000e'),
('oo5o1s65-9n59-84p4-p903-q65m76ss9584', '20000015', 95000, 'ACTIVE', '2024-11-24 13:22:55.445566', '2024-11-24 13:22:55.445566', NULL, 'e36fd50e-b71e-11ef-8dae-0242ac12000e', NULL, NULL, 'e36fd50e-b71e-11ef-8dae-0242ac12000e'),
('pp6p2t76-0o60-95q5-q014-r76n87tt0695', '20000016', 185000, 'SUSPENDED', '2024-11-25 11:33:11.556677', '2024-11-25 11:33:11.556677', NULL, 'd36fd50d-b71e-11ef-8dae-0242ac12000d', NULL, NULL, 'd36fd50d-b71e-11ef-8dae-0242ac12000d'),
('qq7q3u87-1p71-06r6-r125-s87o98uu1706', '20000017', 130000, 'ACTIVE', '2024-11-26 15:44:22.667788', '2024-11-26 15:44:22.667788', NULL, 'd36fd50d-b71e-11ef-8dae-0242ac12000d', NULL, NULL, 'd36fd50d-b71e-11ef-8dae-0242ac12000d'),
('rr8r4v98-2q82-17s7-s236-t98p09vv2817', '20000018', 70000, 'PENDING', '2024-11-27 09:55:33.778899', '2024-11-27 09:55:33.778899', NULL, 'd36fd50d-b71e-11ef-8dae-0242ac12000d', NULL, NULL, 'd36fd50d-b71e-11ef-8dae-0242ac12000d');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
