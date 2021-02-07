// Mediante la API Fetch realizaremos peticiones HTTP asíncronas para modificar el contenido

// Estas peticiones son procesadas por el Middleware de Express, que se encuentra en /backend/server.js

// CRUD

export const getUsers = () => fetch("http://localhost:4000/list").then(res => res.json());	// Promesa que devuelve la información de los usuarios

export const createUser = (user) => fetch("http://localhost:4000/create", {	// Se envía la información del usuario mediante el método POST
	method: "POST",
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
	body: JSON.stringify(user)
});

export const getUser = (id) => fetch(`http://localhost:4000/${id}`).then(res => res.json());	// Promesa que devuelve la información del usuario

export const updateUser = (user,id) => fetch(`http://localhost:4000/${id}`, {
	method: "POST",
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
	body: JSON.stringify(user)
});

export const deleteUser = (user,id) => fetch(`http://localhost:4000/delete/${id}`, {	// Se solicita la eliminación del usuario mediante el método DELETE
	method: "DELETE",
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	}
});

// AUTENTICACIÓN

export const register = (user) => fetch("http://localhost:4000/register", {	// Se envía la información del usuario mediante el método POST
	method: "POST",
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
	body: JSON.stringify(user)
});

export const login = (email, password) => fetch("http://localhost:4000/login", {
	method: "POST",
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		email,
		password,
	})
});

export const profile = () => fetch("http://localhost:4000/user/profile").then(res => res.json());