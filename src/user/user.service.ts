import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, ValidateUserDto } from 'src/database/user.dto';
import { User } from 'src/database/user.interface';

@Injectable()
export class UserService {
    private tokenRegister: {[email: string]: string[]} = {};

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user: User = await this.userModel.findOne({ email: createUserDto.email });
        
        if (!user) {
            return await this.userModel.create(createUserDto);
        }

        throw new HttpException('USER ALREADY EXISTS!', HttpStatus.BAD_REQUEST);
    }

    async validateUser(validateUserDto: ValidateUserDto): Promise<any> {
        const user: User = await this.userModel.findOne({ email: validateUserDto.email });
        
        if (user.password !== validateUserDto.password) {
            throw new HttpException('INVALID PASSWORD!', HttpStatus.UNAUTHORIZED);
        }

        const token: string = this.jwtService.sign({ email: user.email, date: new Date() }, { secret: 'hard!to-guess_secret' });

        if (!this.tokenRegister[user.email] || this.tokenRegister[user.email].length < 6) {
            if (!this.tokenRegister[user.email]) {
                this.tokenRegister[user.email] = [];    
            }

            this.tokenRegister[user.email].push(token);
        } else {
            throw new HttpException('REACHED LOGIN LIMIT!', HttpStatus.TOO_MANY_REQUESTS);
        }
        
        return {
            status: HttpStatus.OK,
            token
        };
    }

    async getUser(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }
}
