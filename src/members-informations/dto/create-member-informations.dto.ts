import { IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateMemberInformationsDto {

    @IsString()
    @MaxLength(36)
    uuid_member: string;

    @IsString()
    @MaxLength(50)
    firstName: string;

    @IsString()
    @MaxLength(50)
    lastName: string;

    @IsEmail()
    @MaxLength(50)
    email: string;

}
