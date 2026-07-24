import {Request,Response} from "express";
import * as inventoryService from "../services/inventory.service.js";


export async function index(
req:Request,
res:Response
){

try{

const products =
await inventoryService.getInventory();


res.json({

success:true,
data:products

});


}catch(error){

res.status(500).json({

success:false,
message:"Failed"

});

}

}



export async function addStock(
req:Request,
res:Response
){

try{

const {
productId,
quantity
}=req.body;


const product =
await inventoryService.stockIn(
productId,
quantity
);


res.json({

success:true,
data:product

});


}catch(error){

res.status(500).json({

success:false,
message:"Stock failed"

});

}

}