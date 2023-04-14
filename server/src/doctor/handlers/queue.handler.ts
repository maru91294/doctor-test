import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractHandler } from 'src/lib/abstract.handler';
import { Appoitment } from '../interfaces/appoitment.interface';


// можно сделать несколько хендлеров и разделить напоминания дней и времени: чтобы он один раз в сутки, например, забирал по дню,
// и в интервале часа - полутора забирал по времени
export class QueueCleaner extends AbstractHandler {
  protected handlerName;

  constructor(@InjectModel('Appoitment') private readonly appoitmentModel: Model<Appoitment>) {
    super();
    this.handlerName = 'send-message';
    this.loopIntervalSec = 60;
  }

  async sendMessageQueue() {
    // небходимо делать выборку по дате и полю отправлено сообщение или нет, чтобы избежать повторных напоминаний
    const appoitments = await this.appoitmentModel.find().exec();

    const now = new Date()
    for (const trigger of appoitments) {
      const d = new Date(trigger.dateTime)
      const dayTrigger = d.getDate() - 1
      const t = d.setMilliseconds(-3 * 60 * 30 * 1000)
      const timeTrigger = new Date(t).toLocaleTimeString()

      if (now.getDay() === dayTrigger) {
        console.log('day');
        const fullName = trigger.surname + ' ' + trigger.name + ' ' + trigger.lastname;
        const date = trigger.dateTime;
        const address = 'ул. Большая Якиманка, 10'
        // отправляем напоминание за день, передаем данные fullName, date, address
        // отмечаем в бд что сообщение отправлено, чтобы больше не отправлять
      }

      if (now.toLocaleTimeString() === timeTrigger && now.getDate() == d.getDate()) {
        console.log('time');
        // отправляем напоминание за полтора часа
        // делаем также как и со днем: отмечаем в бд что сообщение отправлено, чтобы больше не отправлять
      }
    }
  }

  async runWork() {
    console.log('запуск send-message');
    await this.sendMessageQueue();
  }
}
