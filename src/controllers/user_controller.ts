import { Request, Response } from "express";
import { UserService, UserSignInRequest } from "../services/user_service";
import { getErrorMessage } from "../utils/errors_util";

export class UserController {

    constructor(private userService: UserService) { }

    signIn = async (req: Request, res: Response) => {
        try {
            console.log(req.body.name);
            const userRequest: UserSignInRequest = {
                name: req.body.name,
                password: req.body.password
                
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
}
