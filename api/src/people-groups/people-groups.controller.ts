import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PeopleGroupsService } from './people-groups.service';
import { CreatePeopleGroupDto } from './dto/create-peopleGroup.dto';
import { UpdatePeopleGroupDto } from './dto/update-peopleGroup.dto';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { Action } from 'src/ability/ability.factory/ability.factory';

// routes definition and controllers for all CRUD operations of the peopleGroups table with error handling
@Controller('people-groups')
export class PeopleGroupsController {
  constructor(private readonly peopleGroupsService: PeopleGroupsService) {}

  @Post()
  // authorization guard
  @UseGuards(AbilitiesGuard)
  // decorator setting the action and subjects needing authorization
  @CheckAbilities({ action: Action.Create, subject: 'all' })
  create(@Body() createPeopleGroupDto: CreatePeopleGroupDto) {
    try {
      return this.peopleGroupsService.create(createPeopleGroupDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'all' })
  findAll() {
    try {
      return this.peopleGroupsService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'all' })
  findOne(@Param('id') id: number) {
    try {
      return this.peopleGroupsService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "Ce groupe n'existe pas",
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  @Patch(':id')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: 'all' })
  update(
    @Param('id') id: string,
    @Body() updatePeopleGroupDto: UpdatePeopleGroupDto,
  ) {
    try {
      return this.peopleGroupsService.update(+id, updatePeopleGroupDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':name')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: 'all' })
  remove(@Param('name') name: string) {
    try {
      return this.peopleGroupsService.remove(name);
    } catch(error) {
      return(error.message);
    }
  }
}
