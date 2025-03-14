import { I_UserDocument, UserModel } from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type UserSignInRequest = {
    name: string,
    password: string,
}
export class UserService {

    generateTokens(user: I_UserDocument){
        const accessToken = jwt.sign(
            {id: user._id, name: user.name },
            process.env.SECRET_KEY as string,
            { expiresIn: '20s' } // Tempo de expiração do access token
        );

        const refreshToken = jwt.sign(
            { id: user._id, name: user.name },
            process.env.REFRESH_SECRET_KEY as string,
            { expiresIn: '7d' }
        );

        return { accessToken, refreshToken}
    }

        async signIn(user: UserSignInRequest): Promise<unknown> {
        try {
            
            const foundUser = await UserModel.findOne({ name: user.name })
    
            if (!foundUser) {
                throw new Error(`Name of user is not correct ${foundUser}` );
            }
            const isMatch = bcrypt.compareSync(user.password, foundUser.password)

            if (isMatch) {
                const {_id, name } = foundUser;
                const { accessToken, refreshToken } = this.generateTokens(foundUser);
                return {user: {_id, name}, accessToken, refreshToken}
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
