import { useEffect, useState } from "react";


interface Product {
  id:number;
  name:string;
  category:string;
  price:number;
  stock:number;
}



export default function Inventory(){

  const [products,setProducts] = useState<Product[]>([]);
  const [open,setOpen] = useState(false);
const [selectedProduct,setSelectedProduct] = useState<Product | null>(null);
const [quantity,setQuantity] = useState("");



  async function loadInventory(){

    try{

      const token = localStorage.getItem("token");


      const res = await fetch(
        "http://localhost:5000/api/inventory",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      const data = await res.json();


      setProducts(data.data);


    }catch(error){

      console.error(error);

    }

  }



  useEffect(()=>{

    loadInventory();

  },[]);

async function handleStockIn(){

  if(!selectedProduct) return;


  try{

    const token = localStorage.getItem("token");


    await fetch(
      "http://localhost:5000/api/inventory/stock-in",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },

        body:JSON.stringify({

          productId:selectedProduct.id,

          quantity:Number(quantity)

        })

      }
    );


    alert("Stock added!");


    setOpen(false);

    setQuantity("");

    setSelectedProduct(null);


    loadInventory();


  }catch(error){

    console.error(error);

  }

}



  return (

    <div className="space-y-6">


      <h1 className="text-3xl font-bold">
        Inventory
      </h1>



      <div className="bg-white rounded-xl shadow overflow-hidden">


        <table className="w-full">


          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Product
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                Stock
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3">
                Action
              </th>

            </tr>

          </thead>



          <tbody>


          {
            products.map(product=>(


              <tr 
              key={product.id}
              className="border-t"
              >


                <td className="p-3 font-semibold">
                  {product.name}
                </td>


                <td className="p-3">
                  {product.category}
                </td>


                <td className="p-3">
                  ₱{product.price}
                </td>


                <td className="p-3">
                  {product.stock}
                </td>



                <td className="p-3">


                {
                  product.stock === 0

                  ?

                  <span className="text-red-600 font-bold">
                    Out of Stock
                  </span>


                  :

                  product.stock <= 10

                  ?

                  <span className="text-orange-500 font-bold">
                    Low Stock
                  </span>


                  :

                  <span className="text-green-600 font-bold">
                    Good
                  </span>

                }


                </td>



                <td className="p-3">

<button

onClick={()=>{

setSelectedProduct(product);

setOpen(true);

}}

className="bg-blue-600 text-white px-3 py-1 rounded"

>
+ Stock
</button>

                </td>


              </tr>


            ))
          }


          </tbody>


        </table>


      </div>

{
open && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">


<div className="bg-white p-6 rounded-xl w-96">


<h2 className="text-xl font-bold mb-4">
Add Stock
</h2>



<p className="mb-3">

Product:

<b>
{" "}
{selectedProduct?.name}
</b>

</p>



<input

type="number"

placeholder="Quantity"

value={quantity}

onChange={(e)=>setQuantity(e.target.value)}

className="border w-full p-2 rounded mb-4"

/>



<div className="flex gap-3">


<button

onClick={()=>setOpen(false)}

className="bg-gray-400 text-white px-4 py-2 rounded"

>
Cancel
</button>



<button

onClick={handleStockIn}

className="bg-green-600 text-white px-4 py-2 rounded"

>
Add Stock
</button>


</div>



</div>


</div>

)
}

    </div>

  );

}