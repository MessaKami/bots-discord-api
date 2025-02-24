import { IsString, IsInt, IsBoolean, IsUUID, Min, MaxLength } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';

export class CreateRoleDto extends PickType(PickableDiscordUUIDFields, [
  'uuidGuild'
]) {
    @ApiProperty({
        description: 'UUID unique du rôle',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    uuid: string;

    @ApiProperty({
        description: 'Nom du rôle',
        example: 'Modérateur',
        maxLength: 50
    })
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'Nombre de membres ayant ce rôle',
        example: 10
    })
    @IsInt()
    @Min(0)
    member_count: number;

    @ApiProperty({
        description: 'Position du rôle dans la hiérarchie',
        example: 1
    })
    @IsInt()
    @Min(0)
    role_position: number;

    @ApiProperty({
        description: 'Indique si le rôle est affiché séparément',
        example: true
    })
    @IsBoolean()
    hoist: boolean;

    @ApiProperty({
        description: 'Couleur du rôle en format hexadécimal',
        example: '#FF0000'
    })
    @IsString()
    @MaxLength(7)
    color: string;

    @ApiProperty({
        description: 'UUID de la guilde associée',
        example: '123e4567-e89b-12d3-a456-426614174001'
    })

    uuidGuild: string;
}
