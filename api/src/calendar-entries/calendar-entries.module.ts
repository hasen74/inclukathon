import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CalendarEntriesService } from './calendar-entries.service';
import { CalendarEntriesController } from './calendar-entries.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { isAuthenticated } from 'src/app.middleware';

// module allowing the calendarEntries controllers and services to use JWT and prisma object modelling
// also allows the calendarEntries to be used and injected
@Module({
  controllers: [CalendarEntriesController],
  providers: [CalendarEntriesService],
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '8h' },
})],
  exports: [CalendarEntriesService]
})

// exports the module and applies the authentication middleware to all calendarEntries' routes
export class CalendarEntriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes(CalendarEntriesController);
  }
}
