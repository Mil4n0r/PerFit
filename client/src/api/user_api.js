import axios from 'axios';

export const registerUser = (user) => axios.post("http://localhost:4000/register", user, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: user
})
	.then(res => res.data)
	.catch(err => err);

export const getUsers = () => axios.get("http://localhost:4000/admin/user/list")
	.then(res => res.data)
	.catch(err => err);

export const getMonitors = () => axios.get("http://localhost:4000/admin/monitor/list")
	.then(res => res.data)
	.catch(err => err);

export const getUsersMatching = (inactive, search) => axios.get(`http://localhost:4000/admin/user/list/${inactive}/${search}`)
	.then(res => res.data)
	.catch(err => err);

export const getUser = (id) => axios.get(`http://localhost:4000/admin/user/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const logIn = (email, password,rememberme) => axios.post(`http://localhost:4000/login/${rememberme}`, {email,password}, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: {email,password,rememberme}
})
	.catch(err => err);

export const logOut = () => axios.get("http://localhost:4000/user/logout")
	.catch(err => err);

export const forgotPassword = (email) => axios.post("http://localhost:4000/forgot/password", {email}, {
	data: {email}
})
	.catch(err => err);

export const resetPassword = (token, newpassword, passwordConfirm) => axios.post(`http://localhost:4000/reset/password/${token}`, {newpassword, passwordConfirm}, {
	data: {newpassword, passwordConfirm}
})
	.catch(err => err);

export const updateUser = (user,id) => axios.post(`http://localhost:4000/admin/user/${id}`, user, {
	data: user
})
	.catch(err => err);

export const deleteUser = (id) => axios.delete(`http://localhost:4000/admin/user/${id}`)
	.catch(err => err);
export const activateUser = (id) => axios.post(`http://localhost:4000/admin/user/activate/${id}`)
	.catch(err => err);

export const getRequestsForUser = (id) => axios.get(`http://localhost:4000/admin/request/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getFriendsForUser = (id) => axios.get(`http://localhost:4000/admin/friend/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getClientsForTrainer = (id) => axios.get(`http://localhost:4000/admin/client/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const deleteFriend = (id, id2) => axios.delete(`http://localhost:4000/admin/friend/${id}/${id2}`)
	.catch(err => err);

export const deleteClient = (id, id2) => axios.delete(`http://localhost:4000/admin/client/${id}/${id2}`)
	.catch(err => err);