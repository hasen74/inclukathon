import { ForbiddenError } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequiredRule } from './abilities.decorator';
import { AbilityFactory } from './ability.factory/ability.factory';

// this guard is like a "controller" of the authorization process
// it analyzes the request and target data using the rules defined in the ability factory to determine if a user is allowed to do something or not
@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    // finds out about the user making the request from the data transfered by the authentication middleware
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ability = this.caslAbilityFactory.defineAbility(user);

    // iterates over the different rules and returns a custom message if user doesn't have access
    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability)
          .setMessage("Tu n'as pas les droits d'accès")
          .throwUnlessCan(rule.action, rule.subject),
      );
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
