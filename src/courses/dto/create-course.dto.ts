import { IsString, IsNotEmpty, IsBoolean, Length } from "class-validator";
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { PickableDiscordUUIDFields } from "src/utils/pickable-discord-uuid-fields";
import { PickableDtoFields } from "src/utils/pickable-dto-fields";

export class CreateCourseDto extends PickType(IntersectionType(PickableDiscordUUIDFields, PickableDtoFields), [
    'name', 
    'uuid_guild', 
    'uuid_role']) {

    @ApiProperty({
        description: 'Si la formation est certifiante',
        type: String,
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    isCertified: boolean;

    @ApiProperty({
        description: 'UUID de la guilde',
        example: '123456789012345678'
    })
    @IsString()
    @Length(17, 19)
    @IsNotEmpty()
    uuidGuild: string;

    @ApiProperty({
        description: 'UUID de la catégorie',
        example: '123456789012345678'
    })
    @IsString()
    @Length(17, 19)
    uuidCategory: string;
}