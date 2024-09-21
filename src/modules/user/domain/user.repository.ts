import { UserValue } from './user.value';

export interface UserRepository {
  findUserById(id: string): Promise<UserValue | null>;
  registerUser(user: UserValue): Promise<UserValue | null>;
  listUser(): Promise<UserValue[]>;
  findByEmail(email: string): Promise<UserValue | null>;
}
