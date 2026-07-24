import {Request,Response} from "express";
import {getSalesReport} from "../services/report.service.js";


export async function salesReport(
req:Request,
res:Response
){

try{

const report = await getSalesReport();


res.json({

success:true,

data:report

});


}catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Report failed"

});

}

}