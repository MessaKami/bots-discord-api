import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateMemberInformationsDto } from './create-member-informations.dto';

export class UpdateMemberInformationsDto extends PartialType(CreateMemberInformationsDto) {}
