import axios from 'axios';

export const createClass = (sclass) => axios.post("https://perfit-fitness.herokuapp.com/admin/create/class", sclass, {
	data: sclass
})
	.then(res => res.data)
	.catch(err => err);

export const getClasses = () => axios.get(`https://perfit-fitness.herokuapp.com/admin/class/list`)
	.then(res => res.data)
	.catch(err => err);

export const getClass = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/class/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateClass = (sclass,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/class/${id}`, sclass, {
	data: sclass
})
	.catch(err => err);

export const deleteClass = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/class/${id}`)
	.catch(err => err);

export const joinClass = (id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/join/class/${id}`)
	.catch(err => err);

export const leaveClass = (id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/leave/class/${id}`)
	.catch(err => err);

export const checkClassAssistance = (assistance, id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/check/class/assistance/${id}`, assistance, {
	data: assistance
})
	.catch(err => err);