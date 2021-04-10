import axios from 'axios';

export const addClass = (sclass, id) => axios.post(`http://localhost:4000/admin/associate/training/class/${id}`, sclass, { // id = id training
	data: sclass
})
	.then(res => res.data)

export const getClasses = (id) => axios.get(`http://localhost:4000/admin/class/list`)
	.then(res => res.data)

export const getClass = (id) => axios.get(`http://localhost:4000/admin/class/${id}`)
	.then(res => res.data)

export const updateClass = (sclass,id) => axios.post(`http://localhost:4000/admin/class/${id}`, sclass, {
	data: sclass
});

export const deleteClass = (trainingid, id) => axios.delete(`http://localhost:4000/admin/class/${id}`);