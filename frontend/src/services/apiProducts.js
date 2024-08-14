import axios from "axios";
// const API_URL = "https://strapi-store-server.onrender.com/api";

export async function GetProduct() {
  const { data } = await axios.get(`/api/products`);
  return data;
}

// export async function fetchProducts(searchParams) {
//   const queryString = new URLSearchParams(searchParams).toString();
//   return fetch(
//     `https://strapi-store-server.onrender.com/api/products?${queryString}`
//   ).then((res) => res.json());
// }

export async function getProductById(id) {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
}
