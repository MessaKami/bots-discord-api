import { PartialType } from '@nestjs/mapped-types';
import { CreateIdentificationRequestDto } from './create-identification-request.dto';

export class UpdateIdentificationRequestDto extends PartialType(CreateIdentificationRequestDto) {}
