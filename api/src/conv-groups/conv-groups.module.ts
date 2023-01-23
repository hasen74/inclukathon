import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConvGroupsService } from './conv-groups.service';
import { ConvGroupsController } from './conv-groups.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { isAuthenticated } from 'src/app.middleware';

// module allowing the convGroups controllers and services to use JWT and prisma object modelling
// also allows the convGroups to be used and injected
@Module({
  controllers: [ConvGroupsController],
  providers: [ConvGroupsService],
  imports: [
    PrismaModule,
    JwtModule.register({
      signOptions: { expiresIn: '8h' },
    }),
    UsersModule,
  ],
  exports: [ConvGroupsService],
})

// exports the module and applies the authentication middleware to all convGroups' routes
export class ConvGroupsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes(ConvGroupsController);
  }
}
