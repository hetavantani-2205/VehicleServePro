import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const getUsers = () => axios.get(API_URL);
export const addUsers = (user) => axios.get(API_URL,user);
export const deleteUsers = (id) => axios.get(`${API_URL}/${id}`);
