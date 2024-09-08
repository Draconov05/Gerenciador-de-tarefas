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
    findOne(@Param('id') id: string, @Req() request: Request): Promise<Assunto> {
        return this.appService.findOne(id);
    }

    @Get("noticias/:id")
    async noticias(@Param('id') id: string, @Req() request: Request): Promise<Assunto> {
        return this.appService.getNoticias(id);
    }

    @Post()
    create(@Body() CreateAssuntoDto: CreateAssuntoDto): any {
        return this.appService.create(CreateAssuntoDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() CreateAssuntoDto: CreateAssuntoDto): any {
        return this.appService.update(id,CreateAssuntoDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Boolean> {
        return this.appService.delete(id);
    }

}
