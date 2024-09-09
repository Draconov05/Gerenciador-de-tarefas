import { Controller ,Get ,Post ,Put ,Req, Body, Delete, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AssuntosService } from './assuntos.service';
import { Assunto, Status } from './schemas/assunto.schema';
import { CreateAssuntoDto } from './dto/create-assunto.dto';

@Controller('assuntos')
export class AssuntosController {

    constructor(private readonly appService: AssuntosService) {}

    @Get()
    index(@Req() request: Request, @Query() query: any): Promise<Assunto[]> {

        const { search } = query;

        if(search){
            return this.appService.findBySearch(search);
        }else{
            return this.appService.findAll();
        }
        
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

        // Validação de campo
        if (!CreateAssuntoDto.titulo){
            throw new HttpException('Campo titulo não pode ser nulo', HttpStatus.UNPROCESSABLE_ENTITY );
        }else if(!Status[CreateAssuntoDto.status]){
            throw new HttpException('Campo status inválido', HttpStatus.UNPROCESSABLE_ENTITY );
        }

        return this.appService.create(CreateAssuntoDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() CreateAssuntoDto: CreateAssuntoDto): any {
        
        // Validação de campo
        if (!CreateAssuntoDto.titulo){
            throw new HttpException('Campo titulo não pode ser nulo', HttpStatus.UNPROCESSABLE_ENTITY );
        }else if(!Status[CreateAssuntoDto.status]){
            throw new HttpException('Campo status inválido', HttpStatus.UNPROCESSABLE_ENTITY );
        }

        return this.appService.update(id,CreateAssuntoDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Boolean> {
        return this.appService.delete(id);
    }

}
