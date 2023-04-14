import { Inject, Module } from '@nestjs/common';
import { AppoitmentController } from './appoitment.controller';
import { AppoitmentService } from './appoitment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppoitmentSchema } from './schemas/appoitment.schema';
import QueueHandlerInterface from './interfaces/queue.handler.interface';
import { QueueCleaner } from './handlers/queue.handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Appoitment', schema: AppoitmentSchema }])
  ],
  controllers: [AppoitmentController],
  providers: [AppoitmentService, QueueCleaner, {
    provide: 'Handlers',
    useFactory: (...f) => [...f],
    inject: [QueueCleaner],
  }],
  exports: [QueueCleaner]
})
export class AppoitmentModule {
  constructor(@Inject('Handlers') private handlers: QueueHandlerInterface[]) { }

  public onModuleInit() {
    this.handlers.map((handler) => {
      handler.start();
    });
  }

  public onModuleDestroy() {
    this.handlers.map((handler) => handler.stop());
  }
}