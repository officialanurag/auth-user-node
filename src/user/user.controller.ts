import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { User } from 'src/database/user.interface';
import { CreateUserDto, ValidateUserDto } from './../database/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto);
    }

    @Post('/login')
    async validateUser(@Body() validateUserDto: ValidateUserDto) {
        return await this.userService.validateUser(validateUserDto);
    }

    @Get()
    async getUser(@Req() req: any): Promise<User> {
        return await this.userService.getUser(req['user'].email);
    }
}
