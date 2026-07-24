import { Request, Response } from "express";
import * as userService from "../services/user.service.js";


export async function getUsers(
  req: Request,
  res: Response
){

  try {

    const users = await userService.getUsers();

    res.json({
      success:true,
      data:users
    });


  } catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Failed to get users"
    });

  }

}





export async function createUser(
  req:Request,
  res:Response
){

  try {


    const user = await userService.createUser(
      req.body
    );


    res.json({

      success:true,
      data:user

    });



  } catch(error){

    console.log(error);


    res.status(500).json({

      success:false,
      message:"Create user failed"

    });


  }

}





export async function deleteUser(
  req:Request,
  res:Response
){

  try {


    const id = Number(req.params.id);


    await userService.deleteUser(id);



    res.json({

      success:true,
      message:"User deleted"

    });



  } catch(error){

    console.log(error);


    res.status(500).json({

      success:false,
      message:"Delete failed"

    });


  }

}