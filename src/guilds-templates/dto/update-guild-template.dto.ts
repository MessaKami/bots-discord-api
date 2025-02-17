import { PartialType } from '@nestjs/mapped-types';
import { CreateGuildTemplateDto } from './create-guild-template.dto';

export class UpdateGuildTemplateDto extends PartialType(CreateGuildTemplateDto) {}
