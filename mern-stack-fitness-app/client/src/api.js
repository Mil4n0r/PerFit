// Mediante la API Fetch realizaremos peticiones HTTP asíncronas para modificar el contenido

import axios from "axios";

axios.defaults.withCredentials = true;

// Estas peticiones son procesadas por el Middleware de Express, que se encuentra en /backend/server.js

// CRUD

export const getUsers = () => axios.get("http://localhost:4000/admin/list")
	.then(res => res.data)

export const getFoods = () => axios.get("http://localhost:4000/list")
	.then(res => res.data)

export const createFood = (food) => axios.post("http://localhost:4000/create", food, {
	data: food
})
	.then(res => console.log(res.data))

export const getUser = (id) => axios.get(`http://localhost:4000/${id}`)
	.then(res => res.data);

export const updateUser = (user,id) => axios.post(`http://localhost:4000/${id}`, user, {
	data: user
});

export const deleteUser = (id) => axios.delete(`http://localhost:4000/delete/${id}`)

// AUTENTICACIÓN

export const registerUser = (user) => axios.post("http://localhost:4000/register", user, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: user
})
	.then(res => console.log(res.data))

export const login = (email, password) => axios.post("http://localhost:4000/login", {email,password}, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: {email,password}
});

export const logOut = () => axios.get("http://localhost:4000/user/logout")

export const checkLoggedIn = () => axios.get("http://localhost:4000/checkloggedin")
	.then(res => res.data)

export const checkCurrentUser = () => axios.get("http://localhost:4000/checkcurrentuser")
	.then(res => res.data)

export const profile = () => axios.get("http://localhost:4000/user/profile")
	.then(res => res.data)