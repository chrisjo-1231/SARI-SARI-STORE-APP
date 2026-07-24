import { Request, Response } from "express";
import * as productService from "../services/product.service.js";

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Error creating product",
    });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await productService.getProducts();

    res.json({
      success: true,
      data: products,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
export async function getProduct(req: Request, res: Response) {
  const id = Number(req.params.id);

  const product = await productService.getProductById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.json({
    success: true,
    data: product,
  });
}
export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const product = await productService.updateProduct(id, req.body);

    return res.json({
      success: true,
      data: product,
    });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Update failed",
    });
  }
}
export async function deleteProduct(req: Request, res: Response) {

  try {

    console.log("DELETE REQUEST ID:", req.params.id);

    const id = Number(req.params.id);


    const deletedProduct = await productService.deleteProduct(id);


    console.log("Deleted:", deletedProduct);


    res.json({
      success:true,
      message:"Product deleted successfully",
      data: deletedProduct
    });


  } catch(error){

    console.log("DELETE ERROR:", error);


    res.status(500).json({
      success:false,
      message:"Failed to delete product"
    });

  }

}