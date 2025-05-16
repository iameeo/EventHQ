import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    HttpModule,
    GatewayModule,
  ],
})
export class AppModule {}