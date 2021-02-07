// Mediante la API Fetch realizaremos peticiones HTTP asíncronas para modificar el contenido

// Estas peticiones son procesadas por el Middleware de Express, que se encuentra en /backend/server.js

// CRUD

export const getUsers = () => fetch("http://localhost:4000/admin/list",
{
	method: "GET",
	withCredentials: true,
	credentials: 'include',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
}).then(res => res.json());	// Promesa que devuelve la información de los usuarios

export const createUser = (user) => fetch("http://localhost:4000/create", {	// Se envía la información del usuario mediante el método POST
	method: "POST",
	withCredentials: true,
	credentials: 'include',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
	body: JSON.stringify(user)
});

export const getUser = (id) => fetch(`http://localhost:4000/${id}`).then(res => res.json());	// Promesa que devuelve la información del usuario

export const updateUser = (user,id) => fetch(`http://localhost:4000/${id}`, {
	method: "POST",
	withCredentials: true,
	credentials: 'include',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
	body: JSON.stringify(user)
});

export const deleteUser = (user,id) => fetch(`http://localhost:4000/delete/${id}`, {	// Se solicita la eliminación del usuario mediante el método DELETE
	method: "DELETE",
	withCredentials: true,
	credentials: 'include',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	}
});

// AUTENTICACIÓN

export const register = (user) => fetch("http://localhost:4000/register", {	// Se envía la información del usuario mediante el método POST
	method: "POST",
	withCredentials: true,
	credentials: 'include',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
	body: JSON.stringify(user)
});

export const login = (email, password) => fetch("http://localhost:4000/login", {
	method: "POST",
	withCredentials: true,
	credentials: 'include',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		email,
		password,
	})
});

//export const logOut = () => fetch("http://localhost:4000/user/logout").then(res => res.json());

//export const logOut = () => fetch("http://localhost:4000/logout").then(res => res.json());

export const logOut = (user,id) => fetch("http://localhost:4000/user/logout", {
	method: "GET",
	withCredentials: true,
	credentials: 'include',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	}
});

export const profile = () => fetch("http://localhost:4000/user/profile", {
	method: "GET",
	withCredentials: true,
	credentials: 'include',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	}
}).then(res => res.json());