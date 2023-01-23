import { PartialType } from '@nestjs/swagger';
import { CreatePeopleGroupDto } from './create-peopleGroup.dto';

export class UpdatePeopleGroupDto extends PartialType(CreatePeopleGroupDto) {}
