import { ICreateUserDTO } from "../../src/modules/account/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../src/modules/account/repositories/inMemory/UsersRepositoryInMemory"
import { AuthenticateUserUseCase } from "../../src/modules/account/useCases/AuthenticateUserUseCase"
import { CreateUserUseCase } from "../../src/modules/account/useCases/CreateUserUseCase"
import { AppError } from "../../src/shared/errors/AppError"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate user', ()=>{

    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it('it should be to auth an user', async ()=>{
        const user: ICreateUserDTO = {
             email: 'user@example.com',
             password: '123',
             name: 'user'
        }
        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({email: user.email, password: user.password})

        expect(result).toHaveProperty('token')
    })

    it('should not to be able to auth an non existing user', ()=>{
        expect(async ()=> {
            await authenticateUserUseCase.execute({email: 'fake@fake.com', password: '1234'})
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not to be able to authenticate with an incorrect password', ()=>{
        expect(async ()=>{
            const user: ICreateUserDTO = {
                email: 'user@9999.com',
                password: '12345',
                name: 'user test error'
           }

           await createUserUseCase.execute(user)
           await authenticateUserUseCase.execute({email: user.email, password: 'incorrect'})

        }).rejects.toBeInstanceOf(AppError)
    })
})