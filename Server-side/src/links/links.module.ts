import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinksService } from './links.service';
import { Link, LinkSchema } from './schemas/link.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }])],
  providers: [LinksService],
  exports: [LinksService]
})
export class LinksModule {}
