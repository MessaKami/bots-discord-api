import { IsString, IsUUID, MaxLength, IsInt, Min, Matches, IsIn } from 'class-validator';

export class CreateMemberDto {
  @IsUUID()
  uuid: string;

  @IsString()
  @MaxLength(50)
  guild_username: string;

  @IsString()
  @Matches(/^\d+\.\d{2}$/, { message: 'xp doit être un nombre décimal avec 2 décimales (ex: 100.00)' })
  xp: string;

  @IsInt()
  @Min(0)
  level: number;

  @IsString()
  @MaxLength(50)
  community_role: string;

  @IsString()
  @MaxLength(50)
  @IsIn(['Active', 'Inactive', 'Banned'], { message: 'status doit être Active, Inactive ou Banned' })
  status: string;

  @IsUUID()
  uuid_guild: string;

  @IsUUID()
  uuid_discord: string;
}
