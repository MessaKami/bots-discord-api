import { IsString, IsUUID, MaxLength, IsBoolean, Matches } from 'class-validator';

export class CreateRoleDto {
    @IsUUID()
    uuid_role: string;

    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(50)
    @Matches(/^\d+$/, { message: 'member_count doit être une chaîne numérique' })
    member_count: string;

    @IsString()
    @MaxLength(50)
    @Matches(/^\d+$/, { message: 'role_position doit être une chaîne numérique' })
    role_position: string;

    @IsBoolean()
    hoist: boolean;

    @IsString()
    @MaxLength(50)
    @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'color doit être un code hexadécimal valide (ex: #FF0000)' })
    color: string;

    @IsUUID()
    uuid_guild: string;
}
