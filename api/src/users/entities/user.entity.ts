import { Role } from "./role.enum";

export class User {
    static get modelName() {
        return 'User'
      }
    firstName: string;
    lastName: string;
    gender: string;
    pronouns: string;
    email: string;
    password: string;
    disability?: string;
    description?: string;
    group?: string;
    peopleGroupId: number;
    role: string;
}
