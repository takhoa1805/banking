import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export interface ICommonService {
  getAccountNumber(): Promise<number>;
  getDateAfterMonth(m: number, date: Date): Date;
}

@Injectable()
export class CommonService implements ICommonService {
  constructor(private dataSource: DataSource) {}

  async getAccountNumber(): Promise<number> {
    const queryRunner = this.dataSource.createQueryRunner();

    const result = await queryRunner.query(
      `SELECT count FROM \`number_count\``,
    );

    const updateValue = result[0].count + 1;

    await queryRunner.query(
      `UPDATE number_count SET count=${updateValue} WHERE id = 1`,
    );

    return result[0].count;
  }

  getDateAfterMonth(m: number, date: Date): Date {
    if (Number.isInteger(m)) {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + m);

      return newDate;
    } else {
      const numberOfDays = Math.ceil(m * 30);
      const newDate = new Date(date);
      newDate.setDate(newDate.getMonth() + numberOfDays);

      return newDate;
    }
  }
}
