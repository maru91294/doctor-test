import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Appoitment } from './interfaces/appoitment.interface';
import { CreateAppoitmentDto } from './dto/create-appoitment.dto';

@Injectable()
export class AppoitmentService {

  constructor(@InjectModel('Appoitment') private readonly appoitmentModel: Model<Appoitment>) { }

  async getAppoitments(): Promise<Appoitment[]> {
    const appoitments = await this.appoitmentModel.find().exec();
    return appoitments;
  }

  async getAppoitment(id: number): Promise<Appoitment> {
    const appoitment = await this.appoitmentModel
      .findById(id)
      .exec();
    return appoitment;
  }

  async addAppoitment(createAppoitmentDto: CreateAppoitmentDto): Promise<Appoitment> {
    const newAppoitment = new this.appoitmentModel(createAppoitmentDto);
    return newAppoitment.save();
  }

  async deleteAppoitment(id: number): Promise<any> {
    const deletedAppoitment = await this.appoitmentModel
      .findByIdAndRemove(id);
    return deletedAppoitment;
  }
}
