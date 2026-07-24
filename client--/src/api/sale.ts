import api from "./axios";


export function createSale(data:any){

  return api.post("/sales", data);

}


export function getSales(){

  return api.get("/sales");

}


export function getSale(id:number){

  return api.get(`/sales/${id}`);

}