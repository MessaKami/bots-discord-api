import { IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto {
  @ApiProperty({
    description: 'Le titre de la ressource',
    maxLength: 50,
    example: 'Guide de démarrage'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @ApiProperty({
    description: 'La description de la ressource',
    example: 'Un guide complet pour démarrer avec le bot'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Le contenu de la ressource',
    example: 'Voici les étapes pour configurer le bot...'
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Le statut de la ressource',
    enum: ['active', 'inactive'],
    example: 'active'
  })
  @IsEnum(['active', 'inactive'], {
    message: 'Le statut doit être soit "active" soit "inactive"'
  })
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'UUID du membre qui crée la ressource',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4', {
    message: 'Le creator doit être un UUID v4 valide'
  })
  @IsNotEmpty({
    message: 'Le creator est obligatoire'
  })
  creator: string;
} 