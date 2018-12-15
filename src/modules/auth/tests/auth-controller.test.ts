import { mocked } from 'ts-jest';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user-repository';
import { AuthController } from '../controllers/auth-controller';
import { User } from '../entities/user';
import { debug } from 'util';

console.log("Test env", process.env.DB_HOST);
console.log("Test env", process.env.NODE_ENV);

describe('Auth Controller', () => {
  // const mockUserRepository = mocked(UserRepository, true);
  // const mockGetCustomRepository = mocked(getCustomRepository, true);
  // beforeEach(() => {
  //   mockUserRepository.mockClear();
  //   mockGetCustomRepository.mockImplementation(() => new UserRepository);
  // });
  it('should run', () => {
    expect(1).toBe(1);
  })

  // it('Should call constructor of UserRepository', () => {
  //   const authController = new AuthController();
  //   expect(UserRepository).toHaveBeenCalledTimes(1);
  // })

})