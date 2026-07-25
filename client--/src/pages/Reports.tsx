import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";


interface ReportData {
  totalSales:number;
  transactions:number;
  bestSeller:string;
}


interface ChartData {
  date:string;
  sales:number;
}



export default function Reports(){


  const [report,setReport] = useState<ReportData | null>(null);

  const [chart,setChart] = useState<ChartData[]>([]);



  async function loadReports(){

    try{

      const token = localStorage.getItem("token");


      const res = await fetch(
        "https://sari-sari-store-app.onrender.com/api/reports",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      const data = await res.json();


      setReport(data.data);



      // temporary chart data
      setChart([
        {
          date:"Mon",
          sales:500
        },
        {
          date:"Tue",
          sales:900
        },
        {
          date:"Wed",
          sales:700
        },
        {
          date:"Thu",
          sales:1200
        },
        {
          date:"Fri",
          sales:1500
        }
      ]);


    }catch(error){

      console.log(error);

    }

  }



  useEffect(()=>{

    loadReports();

  },[]);



  return (

    <div className="space-y-6">


      <h1 className="text-3xl font-bold">
        Sales Reports
      </h1>



      <div className="grid grid-cols-3 gap-5">


        <div className="bg-white shadow rounded-xl p-5">

          <p className="text-gray-500">
            Total Sales
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            ₱{report?.totalSales}
          </h2>

        </div>



        <div className="bg-white shadow rounded-xl p-5">

          <p className="text-gray-500">
            Transactions
          </p>

          <h2 className="text-3xl font-bold">
            {report?.transactions}
          </h2>

        </div>



        <div className="bg-white shadow rounded-xl p-5">

          <p className="text-gray-500">
            Best Seller
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            {report?.bestSeller}
          </h2>

        </div>


      </div>




      <div className="bg-white rounded-xl shadow p-5">


        <h2 className="text-xl font-bold mb-5">
          Sales Overview
        </h2>



        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={chart}>


            <CartesianGrid strokeDasharray="3 3"/>


            <XAxis dataKey="date"/>


            <YAxis/>


            <Tooltip/>



            <Line
              type="monotone"
              dataKey="sales"
              stroke="#16a34a"
              strokeWidth={3}
            />


          </LineChart>


        </ResponsiveContainer>


      </div>



    </div>

  );

}
