import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssuntosController } from './assuntos.controller';
import { AssuntosService } from './assuntos.service';
import { Assunto, AssuntoSchema } from './schemas/assunto.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Assunto.name, schema: AssuntoSchema }])],
  controllers: [AssuntosController],
  providers: [AssuntosService]
})
export class AssuntosModule {}
