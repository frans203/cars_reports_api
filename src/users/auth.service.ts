import { NotFoundException, Injectable, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private usersService:UsersService) {}

    signup = async (email:string, password:string) => {
        const users = await this.usersService.findAll(email)
        if(users.length > 0){
            throw new BadRequestException('email in use')
        }
        //hash password
        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(password, salt, 32)) as Buffer
        const result = salt + '.' + hash.toString('hex')
        const user = this.usersService.create(email, result)
        return user
        
    }

    signin = async (email:string, password:string) => {
        const [user] = await this.usersService.findAll(email)
        if(!user){
            throw new NotFoundException('User not found')
        }
        const salt = user.password.split('.')[0]
        const hash = (await scrypt(password, salt, 32)) as Buffer
        const result = salt + '.' + hash.toString('hex')
        if(result === user.password){
            return user
        }else{
            throw new BadRequestException('Wrong Password')
        }
        
    }

}