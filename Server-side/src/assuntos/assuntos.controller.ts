import { Controller ,Get ,Post ,Put ,Req, Body, Delete, Param } from '@nestjs/common';
import { Request } from 'express';
import { AssuntosService } from './assuntos.service';
import { Assunto } from './schemas/assunto.schema';
import { CreateAssuntoDto } from './dto/create-assunto.dto';

@Controller('assuntos')
export class AssuntosController {

    constructor(private readonly appService: AssuntosService) {}

    @Get()
    index(@Req() request: Request): Promise<Assunto[]> {
        return this.appService.findAll();
    }

    @Get(":id")
    findOne(@Req() request: Request, id: string): Promise<Assunto> {
        return this.appService.findOne(id);
    }

    @Get("noticias/:id")
    async noticias(@Req() request: Request, id: string): Promise<any> {
        this.appService.storeNoticias(id);
        return this.appService.findOne(id);
    }

    @Post()
    create(@Body() CreateAssuntoDto: CreateAssuntoDto): any {
        return this.appService.create(CreateAssuntoDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() CreateAssuntoDto: CreateAssuntoDto): any {
        return this.appService.update(id,CreateAssuntoDto);
    }

    @Delete()
    delete(@Param('id') id: string): any {
        return;
    }

}
