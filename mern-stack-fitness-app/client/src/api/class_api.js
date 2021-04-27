import axios from 'axios';

export const createClass = (sclass) => axios.post("http://localhost:4000/admin/create/class", sclass, {
	data: sclass
})
	.then(res => res.data);

export const getClasses = () => axios.get(`http://localhost:4000/admin/class/list`)
	.then(res => res.data);

export const getClass = (id) => axios.get(`http://localhost:4000/admin/class/${id}`)
	.then(res => res.data);

export const updateClass = (sclass,id) => axios.post(`http://localhost:4000/admin/class/${id}`, sclass, {
	data: sclass
});

export const deleteClass = (id) => axios.delete(`http://localhost:4000/admin/class/${id}`);

export const joinClass = (id) => axios.post(`http://localhost:4000/admin/join/class/${id}`);

export const leaveClass = (id) => axios.post(`http://localhost:4000/admin/leave/class/${id}`);