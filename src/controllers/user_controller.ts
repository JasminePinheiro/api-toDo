import { Request, Response } from "express";
import { UserService, UserSignInRequest } from "../services/user_service";
import { getErrorMessage } from "../utils/errors_util";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user_model";

export type RefreshToken = {
    id: string,
    name: string,
    iat: number,
    exp: number
}
export class UserController {

    constructor(private userService: UserService) { }

    signIn = async (req: Request, res: Response) => {
        try {
            console.log(req.body.name);
            const userRequest: UserSignInRequest = {
                name: req.body.name,
                password: req.body.password,

            }

            const foundUser = await this.userService.signIn(userRequest);
            res.status(200).send(foundUser)
        } catch (error) {
            return res.status(500).send(getErrorMessage(error))
        }
    }

    signUp = async (req: Request, res: Response) => {
        try {
            const foundUser = await this.userService.signUp(req.body);
            res.status(200).send('Inserted Succesfully')
        } catch (error) {
            return res.status(500).send(getErrorMessage(error))
        }
    }
    //  Nova rota para refresh token
    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY as string);
            const userId = (decoded as RefreshToken).id;

            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const { accessToken, refreshToken: newRefreshToken } = this.userService.generateTokens(user);

            res.json({ accessToken, refreshToken: newRefreshToken });
        } catch (error) {
            res.status(400).json({ message: "Invalid refresh token" });
        }
    }
}

