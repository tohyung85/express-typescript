// Mock User Repo
import { User } from '../../entities/user';

export class UserRepository {
  constructor() {
    console.log('mocked user repo')
  }

  public findByEmail (email: string) : Promise<User> {
    const user = new User();
    user.id = 1
    user.email = email;
    user.password = 'mock-password';
    return Promise.resolve(user);
  }

  public findById (id: number) : Promise<User> {
    const user = new User();
    user.id = id
    user.email = 'mock-user';
    user.password = 'mock-password';
    return Promise.resolve(user);
  }

  public createAndSave (email: string, password: string) : Promise<User> {
    const user = new User();
    user.id = 1 
    user.email = email;
    user.password = password;
    return Promise.resolve(user);
  }
}
