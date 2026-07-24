import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";



const router = Router();
router.use(authMiddleware);

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);



export default router;