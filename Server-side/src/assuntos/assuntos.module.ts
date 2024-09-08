import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssuntosController } from './assuntos.controller';
import { AssuntosService } from './assuntos.service';
import { LinksModule } from '../links/links.module';
import { Assunto, AssuntoSchema } from './schemas/assunto.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Assunto.name, schema: AssuntoSchema }]),LinksModule],
  controllers: [AssuntosController],
  providers: [AssuntosService]
})
export class AssuntosModule {}
