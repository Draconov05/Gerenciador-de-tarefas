import { ApiProperty } from '@nestjs/swagger';


export class CreateAssuntoDto {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  palavrasChaves: string;

  @ApiProperty()
  status: string;
}