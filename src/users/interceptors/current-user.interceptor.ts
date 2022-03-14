import {NestInterceptor, ExecutionContext, CallHandler, Injectable} from "@nestjs/common"
import { UsersService } from "../users.service"

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private usersService:UsersService){}

    async intercept(context: ExecutionContext, next: CallHandler){
        const request = context.switchToHttp().getRequest()
        const {userId} = request.session || {} //it can be empty
        if(userId){
            const user = this.usersService.findOne(userId)
            request.currentUser = user
        }
        return next.handle() 
    }
}