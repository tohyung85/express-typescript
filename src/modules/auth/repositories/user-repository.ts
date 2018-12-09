import { EntityRepository, AbstractRepository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  public findByEmail = (email: string) : Promise<User> => {
    return this.repository.findOne({email});
  }

  public findById = (id: number) : Promise<User> => {
    return this.repository.findOne({ id });
  }

  public createAndSave = (email: string, password: string) : Promise<User> => {
    const user = new User();
    user.email = email;
    user.password = password;
    return this.manager.save(user);
  }
}