import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConvGroupDto } from './dto/create-conv-group.dto';
import { UpdateConvGroupDto } from './dto/update-conv-group.dto';

// services called from the controllers to apply changes to the database
@Injectable()
export class ConvGroupsService {
  constructor(private prisma: PrismaService) {}
  
  create(createConvGroupDto: CreateConvGroupDto) {
    return this.prisma.convGroup.create({ data: createConvGroupDto});
  }

  findAll() {
    return this.prisma.convGroup.findMany();
  }

  findOne(id: number) {
    return this.prisma.convGroup.findUnique({ where: { id } });
  }

  update(id: number, updateConvGroupDto: UpdateConvGroupDto) {
    return this.prisma.convGroup.update({
      where: { id },
      data: updateConvGroupDto,
    });
  }

  remove(id: number) {
    return this.prisma.convGroup.delete({ where: { id } });
  }
}
