import { Router } from "express";
import { 
storeSale,
indexSales,
showSale,
receiptSale
} from "../controllers/sale.controller.js";


const router = Router();


router.post("/", storeSale);

router.get("/", indexSales);

router.get("/:id", showSale);

router.get("/receipt/:id", receiptSale);


export default router;
