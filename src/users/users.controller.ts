import { 
    Controller, 
    Post, 
    Body, 
    Delete, 
    Param, 
    Get, 
    Query, 
    Patch,
    NotFoundException,
    Session,
    UseGuards
    // UseInterceptors
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import {Serialize} from '../interceptors/serialize.interceptor'
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

// @UseInterceptors(CurrentUserInterceptor)
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(
        private usersService:UsersService,
        private authService:AuthService
        ){}


    // @Get('/whoami')
    // whoAmI(@Session() session:any){
    //     return this.usersService.findOne(session.userId)
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user:any) {
        return user
    }
    
    @Post("/signup")
    async createUser(
        @Body() body:CreateUserDto,
        @Session() session:any
    ){
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('signin')
    async signIn(
        @Body() body:CreateUserDto, @Session() session:any
    ){
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id
        return user;
    }

    @Post('signout')
    async signOut(@Session() session:any) {
        session.userId = null
        return 
    }
    


    @Get('/:id')
    async getSingleUser(
        @Param('id') id:string
    ){
        
        const user = await this.usersService.findOne(parseInt(id))
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user
    }

    @Get()
    getUsers(
        @Query('email') email:string
    ){
        return this.usersService.findAll(email)
    }

    @Delete("/:id")
    deleteUser(
        @Param('id') id:string
    ){
        return this.usersService.deleteUser(parseInt(id))
    }

    @Patch('/:id')
    updateUser(
        @Param('id') id:string,
        @Body() body:UpdateUserDto
    ){
        return this.usersService.updateUser(parseInt(id), body)
    }

}
