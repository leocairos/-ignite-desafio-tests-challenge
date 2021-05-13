import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRespositoryInMemory: InMemoryUsersRepository;

describe('Create User', () => {
  beforeEach(() => {
    usersRespositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRespositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Name user',
      email: 'mail@mail.com',
      password: '1234'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with exists email', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'Name user',
        email: 'mail@mail.com',
        password: '1234'
      });
      await createUserUseCase.execute({
        name: 'Name user 2',
        email: 'mail@mail.com',
        password: '1234'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

});
