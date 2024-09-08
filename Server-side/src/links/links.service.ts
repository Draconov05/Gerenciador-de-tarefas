import { Model,Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Link } from './schemas/link.schema';

@Injectable()
export class LinksService {

    constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

    async find(assunto): Promise<Link> { 
        return await this.linkModel.findOne({AssuntoId: assunto}).exec();
    }

    async create(CreateLink: any): Promise<Link> {
        const createdLink = new this.linkModel(CreateLink);
        return createdLink.save();
    }

    async findByLink(link: string): Promise<Link> {
        return await this.linkModel.findOne({link: link}).exec();
    } 
}
