import {Router} from "express";
import {
index,
addStock
} from "../controllers/inventory.controller.js";


const router=Router();


router.get("/",index);

router.post("/stock-in",addStock);


export default router;