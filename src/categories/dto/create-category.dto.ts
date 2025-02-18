import { IsString, Length, MaxLength, IsInt, Min } from 'class-validator';

export class CreateCategoryDto {

    @IsString()
    @Length(18, 19)
    uuid: string;

    @IsString()
    @Length(18, 19)
    uuid_guild: string;

    @IsString()
    @MaxLength(50)
    name: string;

    @IsInt()
    @Min(0)
    position: number;

}
