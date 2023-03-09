import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './drivers/drivers.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Driver } from './drivers/driver.entity';
import { TransportsModule } from './transports/transports.module';
import { Transport } from './transports/transport.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'rsiot_lab',
      entities: [Driver, Transport],
      synchronize: true,
  }), 
  DriversModule, TransportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
