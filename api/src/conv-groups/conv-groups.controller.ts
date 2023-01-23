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
import { ConvGroupsService } from './conv-groups.service';
import { CreateConvGroupDto } from './dto/create-conv-group.dto';
import { UpdateConvGroupDto } from './dto/update-conv-group.dto';

// routes definition and controllers for all CRUD operations of the convGroups table with error handling
@Controller('conv-groups')
export class ConvGroupsController {
  constructor(private readonly convGroupsService: ConvGroupsService) {}

  @Post()
  create(@Body() createConvGroupDto: CreateConvGroupDto) {
    try {
      return this.convGroupsService.create(createConvGroupDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Erreur de création de conversation',
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
      return this.convGroupsService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Aucun groupe de conversation trouvé',
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
      return this.convGroupsService.findOne(+id);
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
  update(
    @Param('id') id: string,
    @Body() updateConvGroupDto: UpdateConvGroupDto,
  ) {
    try {
      return this.convGroupsService.update(+id, updateConvGroupDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Erreure de mis à jour',
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
      return this.convGroupsService.remove(+id);
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
}
