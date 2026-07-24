import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "mytindahan_secret";


export interface AuthRequest extends Request {
    user?: {
        id:number;
    };
}


export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
){

    try {

        const authHeader = req.headers.authorization;


        if(!authHeader){

            return res.status(401).json({
                success:false,
                message:"No token provided"
            });

        }


        const token = authHeader.split(" ")[1];


        if(!token){

            return res.status(401).json({
                success:false,
                message:"Invalid token"
            });

        }


        const decoded = jwt.verify(
            token,
            JWT_SECRET
        ) as {
            id:number;
        };


        req.user = {
            id: decoded.id
        };


        next();


    } catch(error){

        return res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        });

    }

}