import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/items";

export const getItems = async () => {
  const res = await axios.get(API_URL);
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
