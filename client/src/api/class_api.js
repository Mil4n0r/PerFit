import axios from 'axios';

export const createClass = (sclass) => axios.post("http://localhost:4000/admin/create/class", sclass, {
	data: sclass
})
	.then(res => res.data)
	.catch(err => err);

export const getClasses = () => axios.get(`http://localhost:4000/admin/class/list`)
	.then(res => res.data)
	.catch(err => err);

export const getClass = (id) => axios.get(`http://localhost:4000/admin/class/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateClass = (sclass,id) => axios.post(`http://localhost:4000/admin/class/${id}`, sclass, {
	data: sclass
})
	.catch(err => err);

export const deleteClass = (id) => axios.delete(`http://localhost:4000/admin/class/${id}`)
	.catch(err => err);

export const joinClass = (id) => axios.post(`http://localhost:4000/admin/join/class/${id}`)
	.catch(err => err);

export const leaveClass = (id) => axios.post(`http://localhost:4000/admin/leave/class/${id}`)
	.catch(err => err);

export const checkClassAssistance = (assistance, id) => axios.post(`http://localhost:4000/admin/check/class/assistance/${id}`, assistance, {
	data: assistance
})
	.catch(err => err);