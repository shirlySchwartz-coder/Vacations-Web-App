import {Request,Response,NextFunction} from "express";

//error->model
import { RouteNotFound } from "../Models/ClientsErrors";

//middle ware function
const ErrorHandler = (error:Error,request:Request,response:Response,nextFunction:NextFunction) =>{
    const err = new RouteNotFound(request.originalUrl);
    
    nextFunction(err.message);
}

export default ErrorHandler;