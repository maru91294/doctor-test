import { Injectable } from '@nestjs/common';
import QueueHandlerInterface from 'src/doctor/interfaces/queue.handler.interface';
import FunctionLooper from 'src/utils/function.looper';

@Injectable()
export abstract class AbstractHandler implements QueueHandlerInterface {
  protected functionLooper: FunctionLooper;
  protected loopIntervalSec = 30;
  protected abstract handlerName: string;

  start() {
    console.log('запуск');
    this.functionLooper = new FunctionLooper();
    this.functionLooper.loopFunc(async () => {
      await this.runWork();
    }, this.loopIntervalSec * 1000);
  }

  stop() {
    console.log('остановка');
    if (this.functionLooper) {
      this.functionLooper.stop();
    }
  }

  protected abstract runWork();
}
