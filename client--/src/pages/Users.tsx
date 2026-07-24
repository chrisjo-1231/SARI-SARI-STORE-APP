import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../api/user";


export default function Users(){


  const [users,setUsers] = useState<any[]>([]);

  const [loading,setLoading] = useState(true);

  const [open,setOpen] = useState(false);



  const [form,setForm] = useState({

    fullname:"",
    email:"",
    password:"",
    role:"CASHIER"

  });




  async function loadUsers(){

    try{

      const res = await getUsers();

      setUsers(res.data.data);


    }catch(error){

      console.error(
        "Failed to load users",
        error
      );


    }finally{

      setLoading(false);

    }

  }




  useEffect(()=>{

    loadUsers();

  },[]);





  function handleChange(e:any){

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  }





 async function handleSubmit(){

try{


await createUser(form);


alert("User added");


setOpen(false);


setForm({

fullname:"",
email:"",
password:"",
role:"CASHIER"

});


loadUsers();


}catch(error){

console.error(error);

alert("Failed to save user");

}

}





  async function handleDelete(id:number){


    const confirmDelete = window.confirm(
      "Delete this user?"
    );


    if(!confirmDelete) return;



    try{


      await deleteUser(id);


      loadUsers();


    }catch(error){

      console.error(error);

    }


  }





return (

<div className="space-y-6">


<div className="flex justify-between items-center">


<h1 className="text-3xl font-bold">
Users
</h1>



<button

onClick={()=>setOpen(true)}

className="bg-green-600 text-white px-5 py-2 rounded-lg"

>
+ Add User
</button>


</div>




{
loading ?

<p>
Loading users...
</p>

:

<div className="bg-white rounded-xl shadow overflow-hidden">


<table className="w-full">


<thead className="bg-gray-100">

<tr>

<th className="p-3 text-left">
Name
</th>

<th className="p-3 text-left">
Email
</th>

<th className="p-3 text-left">
Role
</th>

<th className="p-3">
Action
</th>

</tr>

</thead>



<tbody>


{

users.map(user=>(


<tr
key={user.id}
className="border-t"
>


<td className="p-3">
{user.fullname}
</td>


<td className="p-3">
{user.email}
</td>


<td className="p-3">
{user.role}
</td>



<td className="p-3">

<button

onClick={()=>handleDelete(user.id)}

className="bg-red-600 text-white px-3 py-1 rounded"

>
Delete
</button>

</td>


</tr>


))

}


</tbody>


</table>


</div>

}





{
open && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center">


<div className="bg-white rounded-xl p-6 w-96">


<h2 className="text-xl font-bold mb-4">
Add User
</h2>



<input

className="border p-2 w-full mb-3 rounded"

placeholder="Fullname"

name="fullname"

value={form.fullname}

onChange={handleChange}

/>



<input

className="border p-2 w-full mb-3 rounded"

placeholder="Email"

name="email"

value={form.email}

onChange={handleChange}

/>



<input

className="border p-2 w-full mb-3 rounded"

placeholder="Password"

type="password"

name="password"

value={form.password}

onChange={handleChange}

/>




<select

className="border p-2 w-full mb-4 rounded"

name="role"

value={form.role}

onChange={handleChange}

>

<option value="CASHIER">
Cashier
</option>

<option value="ADMIN">
Admin
</option>


</select>




<div className="flex justify-end gap-3">


<button

onClick={()=>setOpen(false)}

className="bg-gray-400 text-white px-4 py-2 rounded"

>
Cancel
</button>


<button

onClick={handleSubmit}

className="bg-blue-600 text-white px-4 py-2 rounded"

>
Save
</button>


</div>


</div>


</div>

)
}



</div>

);

}