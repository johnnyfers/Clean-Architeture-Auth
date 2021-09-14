import { container } from 'tsyringe';

import { UserRepository } from '../../modules/account/framework/typeorm/repositories/UsersRepository';
import { IUserRepository } from '../../modules/account/repositories/IUserRepository';

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
)