import axios from 'axios';

export const registerUser = (user) => axios.post("https://perfit-fitness.herokuapp.com/register", user, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: user
})
	.then(res => res.data)
	.catch(err => err);

export const getUsers = () => axios.get("https://perfit-fitness.herokuapp.com/admin/user/list")
	.then(res => res.data)
	.catch(err => err);

export const getMonitors = () => axios.get("https://perfit-fitness.herokuapp.com/admin/monitor/list")
	.then(res => res.data)
	.catch(err => err);

export const getUsersMatching = (inactive, search) => axios.get(`https://perfit-fitness.herokuapp.com/admin/user/list/${inactive}/${search}`)
	.then(res => res.data)
	.catch(err => err);

export const getUser = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/user/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const logIn = (email, password,rememberme) => axios.post(`https://perfit-fitness.herokuapp.com/login/${rememberme}`, {email,password}, {	// Por defecto se le aplica JSON.stringify al segundo argumento
	data: {email,password,rememberme}
})
	.catch(err => err);

export const logOut = () => axios.get("https://perfit-fitness.herokuapp.com/user/logout")
	.catch(err => err);

export const forgotPassword = (email) => axios.post("https://perfit-fitness.herokuapp.com/forgot/password", {email}, {
	data: {email}
})
	.catch(err => err);

export const resetPassword = (token, newpassword, passwordConfirm) => axios.post(`https://perfit-fitness.herokuapp.com/reset/password/${token}`, {newpassword, passwordConfirm}, {
	data: {newpassword, passwordConfirm}
})
	.catch(err => err);

export const updateUser = (user,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/user/${id}`, user, {
	data: user
})
	.catch(err => err);

export const deleteUser = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/user/${id}`)
	.catch(err => err);
export const activateUser = (id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/user/activate/${id}`)
	.catch(err => err);

export const getRequestsForUser = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/request/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getFriendsForUser = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/friend/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getClientsForTrainer = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/client/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const deleteFriend = (id, id2) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/friend/${id}/${id2}`)
	.catch(err => err);

export const deleteClient = (id, id2) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/client/${id}/${id2}`)
	.catch(err => err);