import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersService } from "./users.service";



describe("Auth Service", () => {
    let service:AuthService
    let fakeUsersService:Partial<UsersService>
    beforeEach(async () => {
        const users:User[] = [],

        fakeUsersService = {

            findAll: (email:string) => {
                const filteredUsers = users.filter(user => user.email === email)
                return Promise.resolve(filteredUsers)
            },
            create: (email:string, password:string) => {
                const user = {id: Math.floor(Math.random() * 2390123), email, password} as User
                users.push(user)
                return Promise.resolve(user)
            }   
        
        }
    
            const usersModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide:UsersService,
                    useValue: fakeUsersService
                }
            ]
            }).compile()
            service = usersModule.get(AuthService)
    })
    
    it('can create an instance of the auth service', async () => {
            expect(service).toBeDefined()
    })
    
    it('password hashed, different from the first one', async () => {
        const user = await service.signup('teste@mail.com', "1234")
    
        expect(user.password).not.toEqual("1234")
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    
    })
    
    it('shows an error if an email already exists', async () => {
        // fakeUsersService.findAll = () => {
        //     return Promise.resolve([{id:1, email: 'frans@gmail.com', password: "1234"} as User])
        // }
        // expect.assertions(2)
        await service.signup("email@gmail.com", "1234")

        try{
            await service.signup("email@gmail.com", "1234")
        }catch(err){
            expect(err).toBeInstanceOf(BadRequestException)
            expect(err.message).toBe("email in use")
        }
    
    
    })

    it("shows an error if user tries to login with unused email", async () => {
        try{
            await service.signin("teste@1232", "23i92i32")
        }catch(e){
            expect(e).toBeInstanceOf(NotFoundException)
            expect(e.message).toBe("User not found")
        }
    }) 

    it("throw an error if an invalid password is provided", async () => {
        const createdUser = await service.signup("teste@1232.com", "23i92i32")
        try{
            const user = await service.signin("teste@1232.com", "23i92i323")
            expect(user).not.toBeDefined()
        }catch(e){
            expect(e).toBeInstanceOf(BadRequestException)
            expect(e.message).toBe("Wrong Password")
        }
    })

    it("returns an user if the correct password is provided", async () => {
        await service.signup("teste@1232.com", "23i92i32")

        const user = await service.signin("teste@1232.com", "23i92i32")
        expect(user).toBeDefined()

    })
})

