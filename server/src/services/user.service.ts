import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";



export async function getUsers(){

  return prisma.user.findMany({

    orderBy:{
      createdAt:"desc"
    },

    select:{

      id:true,
      fullname:true,
      email:true,
      role:true,
      createdAt:true

    }

  });

}





export async function createUser(data:any){


  const password = await bcrypt.hash(
    data.password,
    10
  );


  return prisma.user.create({

    data:{

      fullname:data.fullname,

      email:data.email,

      password,

      role:data.role

    },


    select:{

      id:true,
      fullname:true,
      email:true,
      role:true,
      createdAt:true

    }


  });


}





export async function deleteUser(id:number){


  return prisma.user.delete({

    where:{
      id
    }

  });


}