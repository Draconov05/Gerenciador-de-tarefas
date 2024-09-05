import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AssuntosModule } from './assuntos/assuntos.module';
import { LinksModule } from './links/links.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Draconov:Drac0nov$@taskgen.m2tpz.mongodb.net/?retryWrites=true&w=majority&appName=TaskGen'), 
    AssuntosModule, 
    LinksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
