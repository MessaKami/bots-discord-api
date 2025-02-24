import { IsNotEmpty, IsBoolean } from "class-validator";
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
}