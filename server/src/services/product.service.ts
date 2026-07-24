import { prisma } from "../config/prisma.js";


interface ProductInput {
  name:string;
  barcode:string;
  category:string;
  price:number;
  stock:number;
}



export async function createProduct(data:ProductInput){

  return prisma.product.create({
    data
  });

}



export async function getProducts(){

  return prisma.product.findMany({

    orderBy:{
      createdAt:"desc"
    }

  });

}



export async function getProductById(id:number){

  return prisma.product.findUnique({

    where:{
      id
    }

  });

}



export async function updateProduct(
  id:number,
  data:ProductInput
){

  return prisma.product.update({

    where:{
      id
    },

    data

  });

}



export async function deleteProduct(id:number){

  return prisma.product.delete({

    where:{
      id
    }

  });

}