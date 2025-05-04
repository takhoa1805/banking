import { Module } from '@nestjs/common';
import { CommonService } from './services/common.service';

@Module({
  imports: [],
  controllers: [],
  exports: ['ICommonService'],
  providers: [
    {
      provide: 'ICommonService',
      useClass: CommonService,
    },
  ],
})
export class CommonModule {}
