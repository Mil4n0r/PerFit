import axios from 'axios';

export const registerUser = (user) => axios.post("http://localhost:4000/register", user, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: user
})
	.then(res => res.data)

export const getUsers = () => axios.get("http://localhost:4000/admin/user/list")
	.then(res => res.data)
	
export const getUser = (id) => axios.get(`http://localhost:4000/admin/user/${id}`)
	.then(res => res.data);

export const profile = () => axios.get("http://localhost:4000/user/profile")
	.then(res => res.data)

export const logIn = (email, password) => axios.post("http://localhost:4000/login", {email,password}, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: {email,password}
})

export const logOut = () => axios.get("http://localhost:4000/user/logout")

export const updateUser = (user,id) => axios.post(`http://localhost:4000/admin/user/${id}`, user, {
	data: user
});

export const deleteUser = (id) => axios.delete(`http://localhost:4000/admin/user/${id}`);

export const getRequestsForUser = (id) => axios.get(`http://localhost:4000/admin/request/list/${id}`)
	.then(res => res.data)

export const getFriendsForUser = (id) => axios.get(`http://localhost:4000/admin/friend/list/${id}`)
	.then(res => res.data)

export const deleteFriend = (id, id2) => axios.delete(`http://localhost:4000/admin/friend/${id}/${id2}`);