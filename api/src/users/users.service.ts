import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';


// services called from the controllers to apply changes to the database
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private ConfigService: ConfigService,
  ) {}

  // sign-up service : use of the bcrypt library to hash and salt passwords before entering them in the database
  async signUp(id: number, createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hash;
    return this.prisma.user.create({ data: { email: createUserDto.email, password: hash, role: createUserDto.role,
    group: {
      connect: { id: id },
  }}, });
  }

  // sign-in service : after the password check with the bcrypt library, a jwt token is emitted and returned if sign-in is successful
  async signIn(authUserDto: AuthUserDto, jwt: JwtService): Promise<any> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: authUserDto.email },
    });
    if (foundUser) {
      const { password } = foundUser;
      if (await bcrypt.compare(authUserDto.password, password)) {
        const payload = { email: authUserDto.email };
        return {
          token: jwt.sign(payload, {
            secret: this.ConfigService.get<string>('SECRET'),
          }),
        };
      }
      return new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
    return new HttpException('Incorrect username', HttpStatus.UNAUTHORIZED);
  }

  findAll() {
    return this.prisma.user.findMany({include: { group: true }});
  }

  findAllbyGroup(peopleGroupId: number) {
    return this.prisma.user.findMany({where: { peopleGroupId: peopleGroupId }});
  }

  findOne(email: string) {
    return this.prisma.user.findUnique({ where: { email }, include: { group: true } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(updateUserDto.password, salt);
      updateUserDto.password = hash;
    }
    await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return;
  }

  remove(email: string) {
    return this.prisma.user.delete({ where: { email } })
  }
}
