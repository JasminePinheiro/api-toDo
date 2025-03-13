import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface I_UserDocument extends Document {
    name: string,
    password: string,
}

const UserSchema = new Schema<I_UserDocument>({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
});

const saltRounds = 8;

async function userHashing(next) {
    const user: I_UserDocument = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds)
    }
    next();
}

UserSchema.pre('save', userHashing)

export const UserModel = model<I_UserDocument>('UserModel', UserSchema);