import { Router } from "express";
import { 
storeSale,
indexSales,
showSale
} from "../controllers/sale.controller.js";


const router = Router();


router.post("/",storeSale);


router.get("/",indexSales);


router.get("/:id",showSale);


export default router;