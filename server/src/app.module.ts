import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppoitmentModule } from './doctor/appoitment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/appoitments', { useNewUrlParser: true }),
    AppoitmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }