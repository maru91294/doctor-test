import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { AppoitmentService } from './appoitment.service';
import { CreateAppoitmentDto } from './dto/create-appoitment.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';


@Controller('appoitment')
export class AppoitmentController {

  constructor(private appoitmentService: AppoitmentService) { }

  @Get('all')
  async getAppoitments(@Res() res) {
    const appoitments = await this.appoitmentService.getAppoitments();
    return res.status(HttpStatus.OK).json(appoitments);
  }

  @Get('/:id')
  async getAppoitment(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const appoitment = await this.appoitmentService.getAppoitment(id);
    if (!appoitment) throw new NotFoundException('Appoitment does not exist!');
    return res.status(HttpStatus.OK).json(appoitment);

  }

  @Post('/add')
  async addAppoitments(@Res() res, @Body() CreateAppoitmentDto: CreateAppoitmentDto) {
    const newAppoitment = await this.appoitmentService.addAppoitment(CreateAppoitmentDto);
    return res.status(HttpStatus.OK).json({
      message: "Appoitment has been submitted successfully!",
      appoitment: newAppoitment
    })
  }

  @Delete('/delete')
  async deleteAppoitment(@Res() res, @Query('id', new ValidateObjectId()) id) {
    const deletedAppoitment = await this.appoitmentService.deleteAppoitment(id);
    if (!deletedAppoitment) throw new NotFoundException('Appoitment does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Appoitment has been deleted!',
      appoitment: deletedAppoitment
    })
  }
}
