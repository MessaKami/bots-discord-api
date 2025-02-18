import { IsString, IsEmail, IsUUID, Length } from 'class-validator';

export class CreateIdentificationRequestDto {
    
  @IsUUID()
  uuid_member: string; 

  @IsString()
  @Length(2, 50)
  firstname: string;

  @IsString()
  @Length(2, 50)
  lastname: string;

  @IsEmail()
  email: string;

}
