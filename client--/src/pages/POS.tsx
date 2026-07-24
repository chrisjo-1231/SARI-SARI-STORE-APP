import { useEffect, useState } from "react";
import { getProducts } from "../api/product";
import type { Product } from "../types/product";
import  { createSale } from "../api/sale";

interface CartItem extends Product {
  quantity: number;
}


export default function POS() {

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");



  async function loadProducts() {

    try {

      const res = await getProducts();

      setProducts(res.data.data);

    } catch(error) {

      console.error(error);

    }

  }



  useEffect(() => {

    loadProducts();

  }, []);





  function addToCart(product: Product) {


    const existing = cart.find(
      item => item.id === product.id
    );


    if(existing) {


      setCart(

        cart.map(item =>

          item.id === product.id

          ?

          {
            ...item,
            quantity: item.quantity + 1
          }

          :

          item

        )

      );


    } else {


      setCart([

        ...cart,

        {
          ...product,
          quantity: 1
        }

      ]);

    }

  }





  function increaseQty(id:number) {


    setCart(

      cart.map(item =>

        item.id === id

        ?

        {
          ...item,
          quantity:item.quantity + 1
        }

        :

        item

      )

    );

  }





  function decreaseQty(id:number) {


    setCart(

      cart.map(item =>

        item.id === id && item.quantity > 1

        ?

        {
          ...item,
          quantity:item.quantity - 1
        }

        :

        item

      )

    );

  }





  function removeItem(id:number) {


    setCart(

      cart.filter(
        item => item.id !== id
      )

    );

  }





  const total = cart.reduce(

    (sum,item) =>

      sum + item.price * item.quantity,

    0

  );
  async function handleCheckout(){

  if(cart.length === 0){

    alert("Cart is empty");

    return;

  }


  try {


    const saleData = {

      total: total,

      items: cart.map(item => ({

        productId: item.id,

        quantity: item.quantity,

        price: item.price

      }))

    };



    await createSale(saleData);



    alert("Sale completed!");



    setCart([]);



    loadProducts();



  } catch(error){

    console.error(error);

    alert("Checkout failed");

  }

}

const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase()) ||
  product.barcode.toLowerCase().includes(search.toLowerCase()) ||
  product.category.toLowerCase().includes(search.toLowerCase())
);


  return (

    <div className="grid grid-cols-2 gap-6">


      {/* PRODUCTS */}

      <div className="bg-white p-5 rounded-xl shadow">


        <h1 className="text-2xl font-bold mb-4">
          Products
        </h1>
    <input
  type="text"
  placeholder="🔍 Search product..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
/>


        <div className="space-y-3">


          {filteredProducts.map(product => (


            <div

              key={product.id}

              className="border p-3 rounded flex justify-between items-center"

            >


              <div>

                <p className="font-semibold">
                  {product.name}
                </p>


                <p>
                  ₱{product.price}
                </p>


                <p className="text-sm text-gray-500">
                  Stock: {product.stock}
                </p>


              </div>



              <button

                onClick={() => addToCart(product)}

                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"

              >

                Add

              </button>



            </div>


          ))}


        </div>


      </div>






      {/* CART */}


      <div className="bg-white p-5 rounded-xl shadow">


        <h1 className="text-2xl font-bold mb-4">
          Cart
        </h1>




        {
          cart.length === 0

          ?

          (

            <p className="text-gray-500">
              Cart is empty
            </p>

          )

          :

          (

            cart.map(item => (


              <div

                key={item.id}

                className="border-b py-3"

              >



                <div className="flex justify-between">


                  <div>

                    <p className="font-semibold">
                      {item.name}
                    </p>


                    <p>
                      ₱{item.price} each
                    </p>


                  </div>



                  <button

                    onClick={() => removeItem(item.id)}

                    className="bg-red-600 text-white px-3 py-1 rounded"

                  >

                    X

                  </button>



                </div>





                <div className="flex items-center gap-3 mt-3">



                  <button

                    onClick={() => decreaseQty(item.id)}

                    className="bg-gray-200 px-3 py-1 rounded"

                  >

                    -

                  </button>





                  <span className="font-bold">

                    {item.quantity}

                  </span>





                  <button

                    onClick={() => increaseQty(item.id)}

                    className="bg-gray-200 px-3 py-1 rounded"

                  >

                    +

                  </button>





                  <span className="ml-auto font-semibold">

                    ₱{item.price * item.quantity}

                  </span>



                </div>



              </div>



            ))

          )

        }





        <div className="mt-5 font-bold text-xl">

          Total: ₱{total}

        </div>



<button

  onClick={handleCheckout}

  className="mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"

>
  Checkout
</button>


      </div>



    </div>

  );

}