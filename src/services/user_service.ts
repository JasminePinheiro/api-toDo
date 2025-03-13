import { I_UserDocument, UserModel } from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type UserSignInRequest = {
    name: string,
    password: string 
}
export class UserService {

    async signIn(user: UserSignInRequest): Promise<unknown> {
        try {
            console.log(user);
            
            const foundUser = await UserModel.findOne({ name: user.name })
    
            if (!foundUser) {
                throw new Error(`Name of user is not correct ${foundUser}` );
            }
            const isMatch = bcrypt.compareSync(user.password, foundUser.password)

            if (isMatch) {
                const token = jwt.sign({_id: foundUser._id?.toString(), name: foundUser.name}, process.env.SECRET_KEY, {
                    expiresIn: '2 hours',
                });
                return {user: {_id: foundUser._id, name: foundUser.name}, token: token}
            } else {
                throw new Error('Password is not correct')
            }
        } catch (error) {
            throw error;
        }
    }

    async signUp(user: I_UserDocument): Promise<void> {
        try {
            await UserModel.create(user);
        } catch (error) {
            throw error;
        }
    }

}
