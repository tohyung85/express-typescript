import { User } from '../entities/user';

describe('User Model', () => {
  let testUser : User;

  beforeAll(() => {
    testUser = new User();
    testUser.email = 'test@testmail.com';
    testUser.password = 'testpassword';
    testUser.id = 1;
  });

  test('whiteList Function', () => {
    const whiteListedUser = testUser.whiteList();

    expect(whiteListedUser).not.toHaveProperty('password');
  });
})
