import type { Product } from "../../types/product";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: Props) {

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Barcode</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>


        <tbody>

          {products.length > 0 ? (

            products.map((product)=>(

              <tr 
                key={product.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-3">
                  {product.name}
                </td>


                <td className="p-3">
                  {product.barcode}
                </td>


                <td className="p-3">
                  {product.category}
                </td>


                <td className="p-3">
                  ₱{product.price.toFixed(2)}
                </td>


                <td className="p-3">
                  {product.stock}
                </td>


                <td className="p-3 text-center space-x-2">


                  <button
                    onClick={() => onEdit(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() => {

                      if(
                        window.confirm(
                          `Delete ${product.name}?`
                        )
                      ){
                        onDelete(product.id);
                      }

                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>


                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={6}
                className="text-center p-6 text-gray-500"
              >
                No products found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}