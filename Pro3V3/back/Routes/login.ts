import express, { NextFunction, Request, Response } from 'express';
import {
  forgotPassword,
  loginUser,
  registerUser,
  deleteUser,
} from '../logic/UserLogic';
import { checkJWT, createJWT } from '../Utils/jwt';
import { UserCred } from '../Models/UserCred';

const loginRouter = express.Router();


//loginUser
loginRouter.post(
  '/loginUser',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    //console.log(request.body);
    let result: any = await loginUser(request.body);
    //console.log(result);
    if (result.jwt !== undefined && result["jwt"].length>10) {
      //console.log(result)
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', result.jwt)
        .json(result);
    } else {
      response.status(400).json({ msg: 'user not found' });
    }
  }
);

loginRouter.post(
  '/registerUser',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let result: any = await registerUser(request.body);
    console.log(result)

    if (!result.errno) {
      response.status(201).json({ msg: 'created' });
    } else {
      response.status(400).json({ msg: result.sqlMessage });
    }
  }
);

//forget password.....
loginRouter.get(
  '/forgotPassword/:userName',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userName = request.params.userName;
    let myJWT:any = forgotPassword(userName);
    console.log(myJWT);

    if (myJWT.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', myJWT)
        .json({ password: myJWT });
    } else {
      response.status(400).json({ msg: 'user not found' });
    }
  }
);
//Delete user
loginRouter.delete(
  '/delete/:id',
  async (request: Request, response: Response, NextFunction: NextFunction) => {
    console.log(`Deleting user ${request.params.id}`);
    let data = await deleteUser(+request.params.id);
    console.log('data: ', data);
    response.status(200).json({ msg: 'User deleted successfully' });
  }
);

loginRouter.post(
  '/getJWT',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userData = request.body;
    response.status(200).json({ jwt: createJWT(userData) });
  }
);

loginRouter.get(
  '/checkJWT/:token',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log('token: ', request.params.token);
    if (checkJWT(request.params.token)) {
      response.status(200).json({ msg: 'all ok' });
    } else {
      response.status(401).json({ msg: 'token is invalid' });
    }
  }
);


export default loginRouter;
