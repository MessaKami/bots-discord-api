import { IsString, MaxLength } from 'class-validator';

export class CreateCampusDto {

  @IsString()
  @MaxLength(50)
  name: string;

}
