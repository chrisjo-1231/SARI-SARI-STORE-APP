import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSale } from "../api/sale";

export default function Receipt() {
  const { id } = useParams();

  const [sale, setSale] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getSale(Number(id));
        setSale(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [id]);

  function handlePrint() {
    const receipt = document.getElementById("receipt");

    if (!receipt) return;

    const printWindow = window.open("", "_blank", "width=400,height=700");

    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>

          <style>
            body{
              font-family: monospace;
              width:80mm;
              margin:auto;
              padding:15px;
            }

            h1,h2,h3,p{
              margin:3px 0;
            }

            hr{
              border:none;
              border-top:1px dashed black;
              margin:10px 0;
            }

            .text-center{
              text-align:center;
            }

            .row{
              display:flex;
              justify-content:space-between;
            }

            button{
              display:none;
            }
          </style>

        </head>

        <body>
          ${receipt.innerHTML}
        </body>

      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  if (!sale) {
    return (
      <div className="flex justify-center mt-20">
        Loading receipt...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">

      <div
        id="receipt"
        className="bg-white w-[320px] p-5 rounded-lg shadow font-mono"
      >

        <div className="text-center">

          <h1 className="text-xl font-bold">
            🏪 MY TINDAHAN
          </h1>

          <p className="text-xs">
            Official Receipt
          </p>

          <p className="text-xs">
            Brgy. Unisan, Quezon
          </p>

          <p className="text-xs">
            Contact: 0912-345-6789
          </p>

        </div>

        <hr className="my-3" />

        <p>
          Receipt #: {sale.id}
        </p>

        <p>
          {new Date(sale.createdAt).toLocaleString()}
        </p>

        <hr className="my-3" />

        {sale.items.map((item: any) => (

          <div
            key={item.id}
            className="flex justify-between mb-2 text-sm"
          >

            <div>

              <div>{item.product.name}</div>

              <div className="text-gray-500 text-xs">
                {item.quantity} × ₱{item.price.toFixed(2)}
              </div>

            </div>

            <div>
              ₱{(item.quantity * item.price).toFixed(2)}
            </div>

          </div>

        ))}

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">

          <span>TOTAL</span>

          <span>
            ₱{sale.total.toFixed(2)}
          </span>

        </div>

        <hr className="my-3" />

        <div className="text-center text-xs mt-4">
          Thank you for shopping!
          <br />
          Please come again ❤️
        </div>

      </div>

      <button
        onClick={handlePrint}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg"
      >
        🖨 Print Receipt
      </button>
      <div className="fixed bottom-6 left-6">
  <Link
    to="/dashboard"
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
  >
    ← Back to Dashboard
  </Link>
</div>

    </div>
  );
}