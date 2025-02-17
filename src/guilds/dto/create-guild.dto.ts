import { IsString, Length, IsInt, Matches, MaxLength, IsJSON } from 'class-validator';

export class CreateGuildDto {
  @IsString()
  @Length(18, 19)
  @Matches(/^\d+$/) // Vérifie qu'il ne contient que des chiffres
  uuid: string;

  @MaxLength(50)
  name: string;

  @IsInt()
  memberCount: number;

  @IsJSON()
  configuration?: Record<string, any>;
}
