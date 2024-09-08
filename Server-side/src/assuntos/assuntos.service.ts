import { Model, Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Assunto } from './schemas/assunto.schema';
import { CreateAssuntoDto } from './dto/create-assunto.dto';
import { LinksService } from '../links/links.service';
import { Link } from '../links/schemas/link.schema';

@Injectable()
export class AssuntosService {

  linkService = null;

  constructor(
    @InjectModel(Assunto.name) private assuntoModel: Model<Assunto>, 
    // @InjectModel(Link.name) private linkModel: Model<Link>, 
    linksService: LinksService) {
    this.linkService = linksService;
  }

  async findAll(): Promise<Assunto[]> {
    var res = await this.assuntoModel.aggregate([
      {
        $lookup: {
          from: "links",
          localField: "_id",
          foreignField: "AssuntoId",
          as: "link"
        }
      }
    ]).exec();

    return res;
  }

  async create(CreateAssuntoDto: CreateAssuntoDto): Promise<Assunto> {

    
    var AssuntoData = {
      "titulo": CreateAssuntoDto.titulo,
      "palavrasChaves": CreateAssuntoDto.palavrasChaves,
      "status": CreateAssuntoDto.status
    };

    const createdAssunto = new this.assuntoModel(AssuntoData);
    createdAssunto.save();

    if(CreateAssuntoDto.link){
      var Link = {
        "link": CreateAssuntoDto.link
      }
  
      Link["AssuntoId"] = createdAssunto;
  
      this.linkService.create(Link);
    }

    return createdAssunto;
  }

  async update(id: string, Request: any): Promise<Assunto> {
    var _id = id;
    var titulo = Request.titulo
    var palavrasChaves = Request.palavrasChaves
    var status = Request.status

    var link = Request.link

    var assunto = await this.assuntoModel.findOne({ _id: new Schema.Types.ObjectId(_id) }).exec();

    if (titulo != null) {
      assunto.titulo = titulo;
    }

    if (palavrasChaves != null) {
      assunto.palavrasChaves = palavrasChaves;
    }

    if (status != null) {
      assunto.status = status;
    }

    if (link != null) {
      // update link
      // var assunto = await this.assuntoModel.findOne({ _id: new Schema.Types.ObjectId(_id) }).exec();
      assunto.status = status;
    }

    return assunto.save();
  }

  async getNoticias(): Promise<any> {

  }

}
