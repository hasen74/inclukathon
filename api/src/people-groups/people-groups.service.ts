import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePeopleGroupDto } from './dto/create-peopleGroup.dto';
import { UpdatePeopleGroupDto } from './dto/update-peopleGroup.dto';

// services called from the controllers to apply changes to the database
@Injectable()
export class PeopleGroupsService {
  constructor(private prisma: PrismaService) {}

  create(createPeopleGroupDto: CreatePeopleGroupDto) {
    return this.prisma.peopleGroup.create({ data: createPeopleGroupDto });
  }

  findAll() {
    return this.prisma.peopleGroup.findMany({ include: { users: true } });
  }

  findOne(id: number) {
    return this.prisma.peopleGroup.findUnique({
      where: { id },
      include: { users: true },
    });
  }

  update(id: number, updatePeopleGroupDto: UpdatePeopleGroupDto) {
    return this.prisma.peopleGroup.update({
      where: { id },
      data: updatePeopleGroupDto,
    });
  }

  remove(name: string) {
    return this.prisma.peopleGroup.delete({ where: { name } });
  }
}
