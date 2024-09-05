import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type AssuntoDocument = HydratedDocument<Assunto>;

enum Status {
    Pending = "pendente", //or User = "user",
    Progress = "Em Progresso", // or Admin = "admin",
    Done = "Concluído"
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