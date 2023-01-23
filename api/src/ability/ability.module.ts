import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory/ability.factory';

// module allowing the AbilityFactory services to be used and injected elsewhere
@Module({
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class AbilityModule {}
