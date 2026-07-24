import { prisma } from "../config/prisma.js";


export async function getInventory(){

return prisma.product.findMany({

orderBy:{
stock:"asc"
}

});

}



export async function stockIn(
productId:number,
quantity:number
){

const product = await prisma.product.update({

where:{
id:productId
},

data:{
stock:{
increment:quantity
}
}

});


await (prisma as any).inventoryLog.create({

data:{
productId,
type:"STOCK_IN",
quantity
}

});


return product;

}