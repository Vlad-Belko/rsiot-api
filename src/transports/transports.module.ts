import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from './transport.entity';
import { TransportsController } from './transports.controller';
import { TransportsService } from './transports.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transport])],
    controllers: [TransportsController],
    providers: [TransportsService],
})
export class TransportsModule {}
