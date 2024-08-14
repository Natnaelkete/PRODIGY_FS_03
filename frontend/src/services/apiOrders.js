import axios from "axios";

export const createOrdersApi = async (newOrder) => {
  const { data } = await axios.post(`/api/orders/create`, newOrder);
  return data;
};

export const getOrdersApi = async () => {
  const { data } = await axios.get(`/api/orders`);
  return data;
};
