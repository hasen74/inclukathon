// data transfer object to make database create requests  more secure
export class CreateCalendarEntryDto {
  name: string;
  date?: string;
  time?: string;
  color?: string;
}
