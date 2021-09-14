import {ICreateUserDTO} from '../dtos/ICreateUserDTO'
import { User } from '../framework/typeorm/entities/UserEntity'

interface IUserRepository{
    create(data: ICreateUserDTO): Promise<void>
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
}

export { IUserRepository}