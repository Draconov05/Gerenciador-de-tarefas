import { Model, Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Assunto, Status } from './schemas/assunto.schema';
import { CreateAssuntoDto } from './dto/create-assunto.dto';
import { LinksService } from '../links/links.service';
import { Link } from '../links/schemas/link.schema';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, ForbiddenException} from '@nestjs/common';
import { map, catchError } from 'rxjs';
import axios from 'axios';


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

    var status: Status = Status[CreateAssuntoDto.status]

    var AssuntoData = {
      "titulo": CreateAssuntoDto.titulo,
      "palavrasChaves": CreateAssuntoDto.palavrasChaves,
      "status": status
    };

    const createdAssunto = new this.assuntoModel(AssuntoData);
    createdAssunto.save();

    var tags = createdAssunto.palavrasChaves.split(",")

    await this.storeNoticias(tags,createdAssunto)

    console.log("done!")

    return createdAssunto;
  }

  async update(id: string, CreateAssuntoDto: CreateAssuntoDto): Promise<Assunto> {

    var _id = id;
    var titulo = CreateAssuntoDto.titulo
    var palavrasChaves = CreateAssuntoDto.palavrasChaves
    var status: Status = Status[CreateAssuntoDto.status]

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

  async delete(id: string): Promise<Boolean> {
    try {

      await this.assuntoModel.deleteOne({ "_id": id })

      return true

    } catch (error) {
      console.log(error)
      return false
    }

  }

  async storeNoticias(tags: any[],assunto): Promise<Boolean> {
    try {
      await tags.forEach(async element => {
        if (element == "ar livre") {
          return true
        } else {

          var baseUrl = "https://servicodados.ibge.gov.br/api/v3/noticias/";

          var url = baseUrl + "?destaque=0&tipo=noticia&busca=" + element;

          const response = await axios({
            method: "GET",
            url: url
          }).catch(() => {
            throw new ForbiddenException('API not available');
          });

          response.data["items"].forEach(async el => {

            var find = await this.linkService.findByLink(el["link"]);

            if (!find) { 
              var Link = {
                "link": el["link"]
              }

              Link["AssuntoId"] = assunto;

              await this.linkService.create(Link);
            }
          })
          
        } 
      });

      return true

    } catch (error) {
      console.log(error)
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async getNoticias(id: string): Promise<Assunto> {
    try {
      const assunto = await this.assuntoModel.findOne({ _id: id }).exec();
      var tags = assunto.palavrasChaves.split(",")

      await this.storeNoticias(tags,assunto)

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
            as: "link",
          }
        }
      ]).exec();

      return res[0];
    } catch (error) {
      console.log(error)
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

}
