import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';
import { Assunto } from '../../assuntos/schemas/assunto.schema';

export type LinkDocument = mongoose.HydratedDocument<Link>;

@Schema()
export class Link {

  @Prop({ type: String, default: function genUUID() {
        return uuidv4()
    }})
  _id: string;

  @Prop()
  link: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Assunto' })
  palavrasChaves: Assunto;
}

export const LinkSchema = SchemaFactory.createForClass(Link);