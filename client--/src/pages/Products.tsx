import { useEffect, useState } from "react";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import ProductForm from "../components/products/ProductForm";
import { getProducts } from "../api/product";
import type { Product } from "../types/product";

export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [open, setOpen] = useState(false);


  async function loadProducts() {
    try {

      const res = await getProducts();

      setProducts(res.data.data);

    } catch (error) {

      console.error("Failed to load products", error);

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {
    loadProducts();
  }, []);

async function handleDelete(id:number){

  console.log("Deleting:", id);


  const confirmDelete = window.confirm(
    "Delete this product?"
  );


  if(!confirmDelete) return;


  try {

    const token = localStorage.getItem("token");


    const res = await fetch(
      `http://localhost:5000/api/products/${id}`,
      {
        method:"DELETE",
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type":"application/json"
        }
      }
    );


    const data = await res.json();

    console.log(data);


    if(res.ok){
     await loadProducts();
    }


  } catch(error){

    console.log(error);

  }

}

  return (

    <div className="space-y-6">


      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Products
        </h1>


        <button
          onClick={() => {
            setSelectedProduct(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          + Add Product
        </button>


      </div>



      {loading ? (

        <p>
          Loading products...
        </p>


      ) : (

        <ProductTable

          products={products}

          onEdit={(product) => {
            setSelectedProduct(product);
            setOpen(true);
          }}


          onDelete={handleDelete}

        />

      )}





      <ProductModal

        open={open}

        onClose={() => {
          setOpen(false);
          setSelectedProduct(null);
        }}

      >


      <ProductForm

  product={selectedProduct}

  onSuccess={() => {

    setOpen(false);
    setSelectedProduct(null);
    loadProducts();

  }}

/>


      </ProductModal>



    </div>

  );
}