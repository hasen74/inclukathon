import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CalendarEntriesService } from './calendar-entries.service';
import { CreateCalendarEntryDto } from './dto/create-calendar-entry.dto';
import { UpdateCalendarEntryDto } from './dto/update-calendar-entry.dto';

@Controller('calendar-entries')
export class CalendarEntriesController {
  constructor(
    private readonly calendarEntriesService: CalendarEntriesService,
  ) {}

  // routes definitions and controllers for all CRUD operations of the calendarEntries table with error handling
  @Post()
  create(@Body() createCalendarEntryDto: CreateCalendarEntryDto) {
    try {
      return this.calendarEntriesService.create(createCalendarEntryDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Erreur de création d'événement",
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.calendarEntriesService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Aucun événement trouvé',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.calendarEntriesService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "Cet événement n'existe pas",
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalendarEntryDto: UpdateCalendarEntryDto,
  ) {
    try {
      return this.calendarEntriesService.update(+id, updateCalendarEntryDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Erreur de mise à jour',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.calendarEntriesService.remove(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "Cet événement n'existe pas",
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }
}
