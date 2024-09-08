import { Model, Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Assunto, Status } from './schemas/assunto.schema';
import { CreateAssuntoDto } from './dto/create-assunto.dto';
import { LinksService } from '../links/links.service';
import { Link } from '../links/schemas/link.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AssuntosService {

  linkService = null;

  constructor(
    @InjectModel(Assunto.name) private assuntoModel: Model<Assunto>, 
    private readonly httpService: HttpService,
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

  async findOne(id: string): Promise<Assunto> {
    var res = await this.assuntoModel.aggregate([
      {
        $match: {
          "_id": id
        }
      },
      {
        $lookup: {
          from: "links",
          localField: "_id",
          foreignField: "AssuntoId",
          as: "link"
        }
      }
    ]).exec();

    return res[0];
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

  async update(id: string, CreateAssuntoDto: CreateAssuntoDto): Promise<Assunto> {
    
    var _id = id;
    var titulo = CreateAssuntoDto.titulo
    var palavrasChaves = CreateAssuntoDto.palavrasChaves
    var status : Status = Status[CreateAssuntoDto.status]

    var assunto = await this.assuntoModel.findOne({ _id: _id }).exec();

    if (titulo != null) {
      assunto.titulo = titulo;
    }

    if (palavrasChaves != null) {
      assunto.palavrasChaves = palavrasChaves;
    }

    if (status != null) {
      assunto.status = status;
    }

    return assunto.save();
  }

  async storeNoticias(id: string): Promise<any> {
    const assunto = await this.assuntoModel.findOne({"_id": id});
    var tags = assunto.palavrasChaves.split(",")
    tags.forEach(element => {

      if(element == "ar livre"){

      }else{

        var baseUrl = "https://servicodados.ibge.gov.br/api/v3/noticias/";

        var url = baseUrl+"?destaque=0&tipo=noticia&busca="+element;

        var res = this.httpService.get(url);

        res["items"].forEach(el => {

          var find = this.linkService.findByLink(el["link"]);
          
          if(!find){
            var Link = {
              "link": el["link"]
            }
        
            Link["AssuntoId"] = assunto;
          }
        })
      }

      this.linkService.create(Link);
    });
    return ;
  }

}
