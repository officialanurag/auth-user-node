import { Document } from 'mongoose';

export interface User extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone: string;
    readonly address: string;
    readonly dob: string;
    readonly gender: string;
    readonly password: string;
    readonly profileImage: string;
    readonly createdAt: Date;
}