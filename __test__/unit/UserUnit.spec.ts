import { ICreateUserDTO } from "../../src/modules/account/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../src/modules/account/repositories/inMemory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../../src/modules/account/useCases/CreateUserUseCase"
import { AppError } from "../../src/shared/errors/AppError"

let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate user', () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

   
    test('create valid user', async () => {
        expect.assertions(2)
        
        const user: ICreateUserDTO = {
            email: 'user@example.com',
            password: '123',
            name: 'user'
        }

        await createUserUseCase.execute(user)

        expect(user.email).toBe('user@example.com')
        expect(async () => {
            await createUserUseCase.execute(user)
        }).rejects.toBeInstanceOf(AppError)
    })
})