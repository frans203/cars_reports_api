import { Repository } from "typeorm";
import { User } from "./user.entity";
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(email: string, password: string): Promise<User>;
    findOne(id: number): Promise<User>;
    findAll(email: string): Promise<User[]>;
    updateUser(id: number, attrs: Partial<User>): Promise<User>;
    deleteUser(id: number): Promise<User>;
}
