import { EntityRepository, AbstractRepository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {

  public findByEmail (email: string) : Promise<User> {
    return this.repository.findOne({email});
  }

  public findById (id: number) : Promise<User> {
    return this.repository.findOne({ id });
  }

  public createAndSave (email: string, password: string) : Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    return this.manager.save(user);
  }

  public async deleteById (id: number) : Promise<User> {
    const user : User = await this.findById(id);
    return this.manager.remove(user);
  }

  public deleteUser (user: User) : Promise<User> {
    return this.manager.remove(user);
  }

  public clearTable () {
    return this.repository.clear();
  }

  public numberOfEntries() {
    return this.repository.count();
  }
}
