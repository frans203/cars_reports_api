import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm"
import {InjectRepository} from "@nestjs/typeorm"
import {User} from "./user.entity"

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    create(email:string, password:string){
        const user = this.userRepo.create({email, password})
        return this.userRepo.save(user)
       
    }

    findOne(id:number){
        const user = this.userRepo.findOne(id)
        return user
    }

    findAll(email:string){
        const users = this.userRepo.find({email})
        return users
    }
    async updateUser(id:number, attrs:Partial<User>){
        const user = await this.findOne(id)
        if(!user){
            throw new Error('User not found')
        }
        Object.assign(user, attrs)
        return this.userRepo.save(user)
    }

    async deleteUser(id:number){
        const user = await this.findOne(id)
        if(!user){
            throw new Error('User not found')
        }
        return this.userRepo.remove(user)
    }
}
