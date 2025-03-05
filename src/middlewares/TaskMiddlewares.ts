import { Request, Response, NextFunction } from "express";

export function validateTaskCreation(req: Request, res: Response, next: NextFunction) {
    const { title, description } = req.body;
    
    if (!title ||!description) {
        return res.status(400).json({ message: "Title and description are required" });
    }
    
    next(); // se estiver tudo ok, segue para o próximo controller
}
