import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsDOB } from 'src/lib/validation/dob.validator';
import { IsPassword } from 'src/lib/validation/password.validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;
    
    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
    @IsNotEmpty()
    @IsString()
    readonly address: string;
    
    @IsNotEmpty()
    @IsDOB()
    readonly dob: string;
    
    @IsNotEmpty()
    @IsString()
    readonly gender: string;
    
    @IsNotEmpty()
    @IsPassword()
    readonly password: string;
    
    @IsNotEmpty()   
    @IsString()
    readonly profileImage: string;
    
    readonly createdAt: Date;
}

export class ValidateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPassword()
    password: string;
}