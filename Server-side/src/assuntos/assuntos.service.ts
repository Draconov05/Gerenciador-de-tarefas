import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Assunto } from './schemas/assunto.schema';
// import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class AssuntosService {
  constructor(@InjectModel(Assunto.name) private assuntoModel: Model<Assunto>) {}

  async findAll(): Promise<Assunto[]> {
    return this.assuntoModel.find().exec();
  }

  async create(): Promise<boolean> {
    try {
        var res = this.assuntoModel.find().exec();
        return true;
    } catch (error) {
        return false;
    }
    
  }

}
