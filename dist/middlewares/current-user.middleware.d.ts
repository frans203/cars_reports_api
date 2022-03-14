import { NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { User } from '../src/users/user.entity';
import { UsersService } from '../src/users/users.service';
declare global {
    namespace Express {
        interface Request {
            currentUser: User;
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private usersService;
    constructor(usersService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
