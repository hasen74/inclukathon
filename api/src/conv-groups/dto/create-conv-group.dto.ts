// data transfer object to make database create requests  more secure

export class CreateConvGroupDto {
  name: string;
  firstName?: string;
  message?: string;
  updated: boolean;
  deleted: boolean;
}
