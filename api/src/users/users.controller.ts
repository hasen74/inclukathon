import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Res,
  Delete,
  HttpStatus,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Action } from 'src/ability/ability.factory/ability.factory';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { CreateUserDto } from './dto/create-user.dto';

// routes definition and controllers for all CRUD operations of the Users table with error handling
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // new user creation route and controller, the id makes reference to the user's group as per the relation with the peopleGroup table
  @Post('/signup/:id')
  async signUp(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.signUp(+id, createUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erreur de création de compte',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  // auth route with JWT check
  @Post('/auth')
  async signIn(@Res() response: any, @Body() authUserDto: AuthUserDto) {
    try {
      const token = await this.usersService.signIn(
        authUserDto,
        this.jwtService,
      );
      return response.status(HttpStatus.OK).json(token);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Identifiants inconnus',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  // authorization guard
  @UseGuards(AbilitiesGuard)
  // decorator setting the action and subjects needing authorization
  @CheckAbilities({ action: Action.Read, subject: 'all' })
  async findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Aucun utilisateur dans la base de données',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  // route/controller to get all the users in a group
  @Get('/bygroup/:id')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'all' })
  async findAllbyGroup(@Param('id') id: number) {
    try {
      return this.usersService.findAllbyGroup(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Aucun utilisateur dans la base de données',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':email')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'all' })
  async findOne(@Param('email') email: string) {
    try {
      return await this.usersService.findOne(email);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Identifiants inconnus',
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Identifiants inconnus',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':email')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: 'all' })
  remove(@Param('email') email: string) {
    try {
      return this.usersService.remove(email);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Email inconnu',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
