import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { isAuthenticated } from 'src/app.middleware';
import { AbilityModule } from 'src/ability/ability.module';

// module allowing the Users controllers and services to use JWT, the ability authorization functions and prisma object modelling
// also allows the Users to be used and injected
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    PrismaModule,
    AbilityModule,
    JwtModule.register({
      signOptions: { expiresIn: '8h' },
    }),
  ],
  exports: [UsersService],
})

// exports the module and applies the authentication middleware to Users' routes except signup and auth
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude('users/signup/:id', 'users/auth')
      .forRoutes(UsersController);
  }
}
