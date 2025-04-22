import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/items";

export const getItems = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getItem = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createItem = async (item: {
  name: string;
  category: string;
  stock: number;
  description: string;
}) => {
  const res = await axios.post(API_URL, item);
  return res.data;
};

export const updateItem = async (id: number, item: {
  name: string;
  category: string;
  stock: number;
  description: string;
}) => {
  const res = await axios.put(`${API_URL}/${id}`, item);
  return res.data;
};

export const deleteItem = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
