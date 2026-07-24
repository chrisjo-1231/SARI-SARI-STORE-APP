import api from "./axios";

export function getProducts() {
  return api.get("/products", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function createProduct(data: {
  name: string;
  barcode: string;
  category: string;
  price: number;
  stock: number;
}) {
  return api.post("/products", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function deleteProduct(id: number) {
  return api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function updateProduct(
  id: number,
  data: {
    name: string;
    barcode: string;
    category: string;
    price: number;
    stock: number;
  }
) {
  return api.put(`/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
