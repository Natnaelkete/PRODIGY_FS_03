import axios from "axios";

export async function GetProduct(search) {
  const { data } = await axios.get(`/api/products${search.toString()}`);
  return data;
}

export async function getProductById(id) {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
}
