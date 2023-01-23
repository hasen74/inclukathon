import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

// data transfer object to make database create requests more secure
export class CreateUserDto { 
  firstName: string;
  lastName: string;
  gender: string;
  pronouns: string;
  email: string;
  password: string;
  disability?: string;
  description?: string;
  @ApiProperty({ enum: Role, default: 'USER', isArray: true })
  role: Role;
}
