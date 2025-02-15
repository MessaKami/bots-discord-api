import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateMemberInformationsDto {

    @IsString()
    @MaxLength(36)
    @MinLength(36)
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
