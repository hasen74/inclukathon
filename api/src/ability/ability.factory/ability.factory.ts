import {
  PureAbility,
  InferSubjects,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  Ability,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

// this file defines authorization rules based on the user's role
// it acts as a service that can be injected into the controllers

// enumeration of all possible CRUD actions
export enum Action {
  Manage = 'manage', // wildcard for any action
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

// typing the Users as subjects of the service
export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    // Admins can do everything
    if (user.role === 'ADMIN') {
      can(Action.Manage, 'all');
    // Coaches can also create
    } else if (user.role === 'COACH') {
      can(Action.Create, 'all');
      can(Action.Read, 'all');
      can(Action.Update, 'all');
    // Users can read and update only
    } else {
      can(Action.Read, 'all');
      can(Action.Update, 'all');
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
