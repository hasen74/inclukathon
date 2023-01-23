import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PeopleGroupsService } from './people-groups.service';
import { PeopleGroupsController } from './people-groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { isAuthenticated } from 'src/app.middleware';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AbilityModule } from 'src/ability/ability.module';

// module allowing the peopleGroups controllers and services to use JWT, the ability authorization functions and prisma object modelling
// also allows the peopleGroups to be used and injected
@Module({
  controllers: [PeopleGroupsController],
  providers: [PeopleGroupsService],
  imports: [
    PrismaModule,
    AbilityModule,
    JwtModule.register({
      signOptions: { expiresIn: '8h' },
    }),
    UsersModule,
  ],
  exports: [PeopleGroupsService],
})

// exports the module and applies the authentication middleware to all peopleGroups' routes
export class PeopleGroupsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes(PeopleGroupsController);
  }
}
