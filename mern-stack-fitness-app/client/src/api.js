// Mediante la API Fetch realizaremos peticiones HTTP asíncronas para modificar el contenido

import axios from "axios";

axios.defaults.withCredentials = true;

// Estas peticiones son procesadas por el Middleware de Express, que se encuentra en /backend/server.js

// CRUD

export const getUsers = () => axios.get("http://localhost:4000/admin/list")
	.then(res => res.data)

export const getFoods = () => axios.get("http://localhost:4000/food/list")
	.then(res => res.data)

export const createFood = (food) => axios.post("http://localhost:4000/create/food", food, {
	data: food
})
	.then(res => console.log(res.data));
	/*.catch((err) => {
		console.log("ERROR HANDLING: ", err.response.data)
	})*/

export const getUser = (id) => axios.get(`http://localhost:4000/admin/user/${id}`)
	.then(res => res.data);

export const updateUser = (user,id) => axios.post(`http://localhost:4000/user/${id}`, user, {
	data: user
});

export const deleteUser = (id) => axios.delete(`http://localhost:4000/delete/user/${id}`)

export const getFood = (id) => axios.get(`http://localhost:4000/food/${id}`)
	.then(res => res.data);

export const updateFood = (user,id) => axios.post(`http://localhost:4000/food/${id}`, user, {
	data: user
});

export const deleteFood = (id) => axios.delete(`http://localhost:4000/delete/food/${id}`)


// AUTENTICACIÓN

export const registerUser = (user) => axios.post("http://localhost:4000/register", user, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: user
})
	.then(res => console.log(res.data))

export const login = (email, password) => axios.post("http://localhost:4000/login", {email,password}, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: {email,password}
});

export const logOut = () => axios.get("http://localhost:4000/admin/logout")

export const checkLoggedIn = () => axios.get("http://localhost:4000/admin/checkloggedin")
	.then(res => res.data)

export const checkCurrentUser = () => axios.get("http://localhost:4000/admin/checkcurrentuser")
	.then(res => res.data)

export const profile = () => axios.get("http://localhost:4000/user/profile")
	.then(res => res.data)