import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class PickableDiscordUUIDFields {

  @ApiProperty({
    description: 'Identifiant unique du serveur (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  uuid_guild: string;

  @ApiProperty({
    description: 'Identifiant unique de l\'utilisateur discord (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  uuid_discord: string;

  @ApiProperty({
    description: 'Identifiant unique de category (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  uuid_category: string;

  @ApiProperty({
    description: 'Identifiant unique de channel (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  uuid_channel: string;

  @ApiProperty({
    description: 'Identifiant unique de rôle (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  uuid_role: string;

  @ApiProperty({
    description: 'Identifiant unique du compte discord du membre (Snowflake)',
    minLength: 17,
    maxLength: 19,
    default: 'discord_user_uuid',
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  uuid_discord: string;

  @ApiProperty({
    description: 'Identifiant unique du tag (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  uuid_tag: string;

}