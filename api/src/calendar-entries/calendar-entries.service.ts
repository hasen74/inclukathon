import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCalendarEntryDto } from './dto/create-calendar-entry.dto';
import { UpdateCalendarEntryDto } from './dto/update-calendar-entry.dto';

// services called from the controllers to apply changes to the database
@Injectable()
export class CalendarEntriesService {
  constructor(private prisma: PrismaService) {}
  
  create(createcalendarEntryDto: CreateCalendarEntryDto) {
    return this.prisma.calendarEntry.create({ data: createcalendarEntryDto});
  }

  findAll() {
    return this.prisma.calendarEntry.findMany();
  }

  findOne(id: number) {
    return this.prisma.calendarEntry.findUnique({ where: { id } });
  }

  update(id: number, updatecalendarEntryDto: UpdateCalendarEntryDto) {
    return this.prisma.calendarEntry.update({
      where: { id },
      data: updatecalendarEntryDto,
    });
  }

  remove(id: number) {
    return this.prisma.calendarEntry.delete({ where: { id } });
  }
}