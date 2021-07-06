import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    dob: String,
    gender: String,
    password: String,
    profileImage: String,
    createdAt: { type: Date, default: Date.now }
})