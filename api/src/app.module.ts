import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PeopleGroupsModule } from './people-groups/people-groups.module';
import { UsersService } from './users/users.service';
import { AbilityModule } from './ability/ability.module';
import { ConvGroupsModule } from './conv-groups/conv-groups.module';
import { CalendarEntriesModule } from './calendar-entries/calendar-entries.module';

// module making all the other modules available to the app
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PeopleGroupsModule,
    // makes .env data available globally
    ConfigModule.forRoot({ isGlobal: true }),
    AbilityModule,
    ConvGroupsModule,
    CalendarEntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
