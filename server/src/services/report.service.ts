import { prisma } from "../config/prisma.js";


export async function getSalesReport(){

  const totalSales = await (prisma as any).sale.aggregate({
    _sum:{
      total:true
    }
  });


  const transactions = await (prisma as any).sale.count();


  const bestSeller = await (prisma as any).saleItem.groupBy({

    by:["productId"],

    _sum:{
      quantity:true
    },

    orderBy:{
      _sum:{
        quantity:"desc"
      }
    },

    take:1

  });


  let bestSellerName = "None";


  if(bestSeller.length > 0){

    const product = await prisma.product.findUnique({

      where:{
        id:bestSeller[0].productId
      }

    });


    if(product){
      bestSellerName = product.name;
    }

  }


  return {

    totalSales: totalSales._sum.total ?? 0,

    transactions,

    bestSeller: bestSellerName

  };

}