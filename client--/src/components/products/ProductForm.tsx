import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../../api/product";
import type { Product } from "../../types/product";

interface Props {
  product?: Product | null;
  onSuccess: () => void;
}

export default function ProductForm({
  product,
  onSuccess,
}: Props) {


  const [form, setForm] = useState({
    name: "",
    barcode: "",
    category: "",
    price: "",
    stock: "",
  });



  // kapag Edit, ilagay ang existing data sa form
  useEffect(() => {

    if(product){

      setForm({
        name: product.name,
        barcode: product.barcode,
        category: product.category,
        price: String(product.price),
        stock: String(product.stock),
      });

    } else {

      setForm({
        name:"",
        barcode:"",
        category:"",
        price:"",
        stock:"",
      });

    }

  }, [product]);




  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ){

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }





  async function handleSubmit(
    e: React.FormEvent
  ){

    e.preventDefault();


    try {


      const data = {
        name: form.name,
        barcode: form.barcode,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
      };



      if(product){

        // UPDATE
        await updateProduct(
          product.id,
          data
        );

        alert("Product updated successfully!");


      } else {

        // CREATE
        await createProduct(data);

        alert("Product added successfully!");

      }



      onSuccess();



    } catch(error:any){

      console.error(error);


      if(error.response){

        alert(error.response.data.message);

      }else{

        alert(error.message);

      }

    }

  }





  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >


      <input
        name="name"
        placeholder="Product Name"
        className="border rounded w-full p-2"
        value={form.name}
        onChange={handleChange}
      />


      <input
        name="barcode"
        placeholder="Barcode"
        className="border rounded w-full p-2"
        value={form.barcode}
        onChange={handleChange}
      />


      <input
        name="category"
        placeholder="Category"
        className="border rounded w-full p-2"
        value={form.category}
        onChange={handleChange}
      />


      <input
        name="price"
        type="number"
        placeholder="Price"
        className="border rounded w-full p-2"
        value={form.price}
        onChange={handleChange}
      />


      <input
        name="stock"
        type="number"
        placeholder="Stock"
        className="border rounded w-full p-2"
        value={form.stock}
        onChange={handleChange}
      />



      <button
        type="submit"
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        {product ? "Update Product" : "Save Product"}
      </button>


    </form>

  );
}