import { Controller ,Get ,Post ,Put ,Req } from '@nestjs/common';
import { Request } from 'express';
import { AssuntosService } from './assuntos.service';
import { Assunto } from './schemas/assunto.schema';

@Controller('assuntos')
export class AssuntosController {

    constructor(private readonly appService: AssuntosService) {}

    @Get()
    index(@Req() request: Request): Promise<Assunto[]> {
        return this.appService.findAll();
    }

    @Post()
    create(@Req() request: Request): string {
        return "create assunto";
    }

    @Put()
    update(@Req() request: Request): string {
        return "update assunto";
    }

}
