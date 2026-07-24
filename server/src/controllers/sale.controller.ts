import { Request, Response } from "express";
import { createSale } from "../services/sale.service.js";
import { getSales } from "../services/sale.service.js";
import { getSaleById } from "../services/sale.service.js";
export async function storeSale(req:Request,res:Response){

try{

console.log(req.body);


const sale = await createSale(req.body);


res.json({
 success:true,
 data:sale
});


}catch(error){

console.log(error);

res.status(500).json({
 success:false,
 message:"Checkout failed"
});

}

}
export async function indexSales(
req:Request,
res:Response
){

try{

const sales = await getSales();


res.json({

success:true,
data:sales

});


}catch(error){

res.status(500).json({

success:false,
message:"Failed to get sales"

});

}

}



export async function showSale(
req:Request,
res:Response
){

try{

const id = Number(req.params.id);


const sale = await getSaleById(id);


res.json({

success:true,
data:sale

});


}catch(error){

res.status(500).json({

success:false,
message:"Failed"

});

}

}