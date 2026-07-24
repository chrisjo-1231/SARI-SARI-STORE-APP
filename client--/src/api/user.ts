import api from "./axios";


export function getUsers(){

  return api.get("/user");

}


export function createUser(data:any){

  return api.post("/user", data);

}


export function deleteUser(id:number){

  return api.delete(`/user/${id}`);

}