import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {AuthService} from "./auth.service"
import {UsersService} from "./users.service"
import { User } from './user.entity';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';


describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>
  let fakeUsersService: Partial<UsersService>
  beforeEach(async () => {
    fakeAuthService = {
      signin: (email:string, password: string) => {
        return Promise.resolve({id:1, email} as User)
      }
    }
    fakeUsersService = {
      findOne: (id:number) => {
        return Promise.resolve({id, email:"test@email.com"} as User)
      },
      findAll: (email:string) => {
        return Promise.resolve([{id: 1, email:"test@email.com"} as User])
      }
    }
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {provide: AuthService,
        useValue: fakeAuthService},
        {provide: UsersService,
        useValue: fakeUsersService}
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("findAll returns a list of all users with an given email", async () => {
    const users = await controller.getUsers("test@email.com")
    expect(users).toBeDefined()
    expect(users[0].id).toEqual(1)
  })

  it("findOne returns an user object with an givel id", async () => {
    const user = await controller.getSingleUser("1")
    expect(user).toBeDefined()
    expect(user.id).toEqual(1)
  })

  it("throws an error if user with given id was not found", async () => {
    fakeUsersService.findOne = () => null
    try{
      const user = await controller.getSingleUser("1")
      expect(user).not.toBeDefined()
    }catch(e){
      expect(e).toBeInstanceOf(NotFoundException)
    }
  })

  it("singin returns an user and updates session",async () => {
    const session = {userId:-999}
    const user = await controller.signIn({email:"sdsds", password: "2323"}, session)
    expect(user).toBeDefined()
    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(user.id)
  })
});
