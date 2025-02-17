import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberInformationsDto } from './create-member-informations.dto';

export class UpdateMemberInformationsDto extends PartialType(CreateMemberInformationsDto) {}
