import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    whoAmI(user: any): any;
    createUser(body: CreateUserDto, session: any): Promise<import("./user.entity").User>;
    signIn(body: CreateUserDto, session: any): Promise<import("./user.entity").User>;
    signOut(session: any): Promise<void>;
    getSingleUser(id: string): Promise<import("./user.entity").User>;
    getUsers(email: string): Promise<import("./user.entity").User[]>;
    deleteUser(id: string): Promise<import("./user.entity").User>;
    updateUser(id: string, body: UpdateUserDto): Promise<import("./user.entity").User>;
}
