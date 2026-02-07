import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

export const getUsers = () => axios.get(API_URL);
export const addUsers = (user) => axios.post(API_URL,user);
export const deleteUsers = (id) => axios.delete(`${API_URL}/${id}`);
