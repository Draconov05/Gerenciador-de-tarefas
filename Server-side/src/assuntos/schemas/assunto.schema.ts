import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type AssuntoDocument = HydratedDocument<Assunto>;

export enum Status {
    Pendente = "Pendente", //or User = "user",
    Em_Progresso = "Em Progresso", // or Admin = "admin",
    Concluido = "Concluído"
  }

@Schema()
export class Assunto {
  @Prop({ type: String, default: function genUUID() {
        return uuidv4()
    }})
  _id: string;

  @Prop()
  titulo: string;

  @Prop()
  palavrasChaves: string;

  @Prop()
  status: Status;

  @Prop()
  dataCriacao: Date
  
  @Prop()
  dataAtualizacao: Date
}

export const AssuntoSchema = SchemaFactory.createForClass(Assunto);