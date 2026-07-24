import { useEffect,useState } from "react";
import {  getSales } from "../api/sale";


export default function Sales(){

const [sales,setSales]=useState<any[]>([]);


async function loadSales(){

try{

const res = await getSales();

console.log(res.data);

setSales(res.data.data);

}catch(error){

console.error(error);

}

}



useEffect(()=>{

loadSales();

},[]);



return (

<div className="space-y-5">


<h1 className="text-3xl font-bold">
Sales History
</h1>



<div className="bg-white rounded-xl shadow">


<table className="w-full">


<thead className="bg-gray-100">

<tr>

<th className="p-3 text-left">
ID
</th>

<th className="p-3 text-left">
Date
</th>

<th className="p-3 text-left">
Total
</th>

<th className="p-3">
Items
</th>

</tr>

</thead>



<tbody>


{
sales.map(sale=>(


<tr 
key={sale.id}
className="border-t"
>


<td className="p-3">
#{sale.id}
</td>


<td className="p-3">

{
new Date(
sale.createdAt
).toLocaleString()

}

</td>


<td className="p-3 font-bold">

₱{sale.total}

</td>


<td className="p-3">

  <a
    href={`/receipt/${sale.id}`}
    className="bg-blue-600 text-white px-3 py-1 rounded"
  >
    View Receipt
  </a>

</td>


</tr>


))

}


</tbody>


</table>


</div>


</div>

);


}