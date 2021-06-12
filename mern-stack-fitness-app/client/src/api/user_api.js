import axios from 'axios';

export const registerUser = (user) => axios.post("http://localhost:4000/register", user, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: user
})
	.then(res => res.data)

export const getUsers = () => axios.get("http://localhost:4000/admin/user/list")
	.then(res => res.data)
	
export const getUsersMatching = (inactive, search) => axios.get(`http://localhost:4000/admin/user/list/${inactive}/${search}`)
	.then(res => res.data)

export const getUser = (id) => axios.get(`http://localhost:4000/admin/user/${id}`)
	.then(res => res.data);

export const logIn = (email, password,rememberme) => axios.post(`http://localhost:4000/login/${rememberme}`, {email,password}, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: {email,password,rememberme}
})

export const logOut = () => axios.get("http://localhost:4000/user/logout")

export const updateUser = (user,id) => axios.post(`http://localhost:4000/admin/user/${id}`, user, {
	data: user
});

export const deleteUser = (id) => axios.delete(`http://localhost:4000/admin/user/${id}`);

export const activateUser = (id) => axios.post(`http://localhost:4000/admin/user/activate/${id}`);

export const getRequestsForUser = (id) => axios.get(`http://localhost:4000/admin/request/list/${id}`)
	.then(res => res.data)

export const getFriendsForUser = (id) => axios.get(`http://localhost:4000/admin/friend/list/${id}`)
	.then(res => res.data)

export const getClientsForTrainer = (id) => axios.get(`http://localhost:4000/admin/client/list/${id}`)
	.then(res => res.data)

export const deleteFriend = (id, id2) => axios.delete(`http://localhost:4000/admin/friend/${id}/${id2}`);

export const deleteClient = (id, id2) => axios.delete(`http://localhost:4000/admin/client/${id}/${id2}`);