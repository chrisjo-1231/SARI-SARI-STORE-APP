    import { prisma } from "../config/prisma.js";


    export async function createSale(data:any)
    {
        const sale = await (prisma as any).sale.create({
        data:{

      total:data.total,

      items:{

        create:data.items.map((item:any)=>({

          productId:item.productId,

          quantity:item.quantity,

          price:item.price

        }))

      }

    },

    include:{
      items:true
    }

  });


  // bawas stock

  for(const item of data.items){


    await prisma.product.update({

      where:{
        id:item.productId
      },


      data:{

        stock:{
          decrement:item.quantity
        }

      }

    });


  }

  


  return sale;

}
export async function getSales(){

  return await (prisma as any).sale.findMany({

    orderBy:{
      createdAt:"desc"
    },

    include:{
      items:{
        include:{
          product:true
        }
      }
    }

  });

}



export async function getSaleById(id:number){

  return await (prisma as any).sale.findUnique({

    where:{
      id
    },

    include:{
      items:{
        include:{
          product:true
        }
      }

    }

  });

}