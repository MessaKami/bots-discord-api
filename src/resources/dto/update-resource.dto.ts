import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateResourceDto } from './create-resource.dto';

// On exclut uuid_member du DTO de mise à jour
export class UpdateResourceDto extends PartialType(
  OmitType(CreateResourceDto, ['uuid_member'] as const)
) {} 