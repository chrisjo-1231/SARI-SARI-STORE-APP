import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



export default function Navbar() {

  const navigate = useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );



  function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  }



return (

<header className="h-16 bg-white border-b flex items-center justify-between px-6">


<h2 className="text-xl font-semibold">
Dashboard
</h2>



<div className="flex items-center gap-6">


<FaBell className="text-xl cursor-pointer" />



<div className="text-right">

<p className="font-semibold">

{user.fullname || "Guest"}

</p>


<p className="text-sm text-gray-500">

{user.role || ""}

</p>


</div>





<button

onClick={logout}

className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"

>

<FaSignOutAlt />

Logout

</button>



</div>


</header>

);

}