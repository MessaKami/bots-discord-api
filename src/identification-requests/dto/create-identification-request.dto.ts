import { PickType } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreateIdentificationRequestDto extends PickType(PickableInternUUIDFields, [
    'uuid_member'
]) {

  @IsString()
  @Length(2, 50)
  firstname: string;

  @IsString()
  @Length(2, 50)
  lastname: string;

  @IsEmail()
  email: string;

  uuid_member: string; 

}
