import { PartialType } from '@nestjs/swagger';
import { CreateConvGroupDto } from './create-conv-group.dto';

export class UpdateConvGroupDto extends PartialType(CreateConvGroupDto) {}
