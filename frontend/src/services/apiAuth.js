import axios from "axios";

export async function signupApi(formData) {
  const { data } = await axios.post(`/api/auth/signup`, formData);

  return data;
}

export async function loginApi(formData) {
  const { data } = await axios.post(`/api/auth/login`, formData);

  return data;
}

export async function logoutApi() {
  const { data } = await axios.post(`/api/auth/logout`);

  return data;
}
