import {Router} from "express";
import {salesReport} from "../controllers/report.controller.js";


const router = Router();


router.get("/",salesReport);


export default router;