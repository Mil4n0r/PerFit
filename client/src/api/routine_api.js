import axios from 'axios';

export const getRoutines = () => axios.get("http://localhost:4000/admin/routine/list")
	.then(res => res.data)
	.catch(err => err);

export const getRoutinesForUser = (id) => axios.get(`http://localhost:4000/admin/routine/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getRoutine = (id) => axios.get(`http://localhost:4000/admin/routine/${id}`)
	.then(res => res.data)
	.catch(err => err);
	
export const updateRoutine = (routine,id) => axios.post(`http://localhost:4000/admin/routine/${id}`, routine, {
	data: routine
})
	.catch(err => err);

export const deleteRoutine = (id) => axios.delete(`http://localhost:4000/admin/routine/${id}`)
	.catch(err => err);

export const associateRoutine = (routine,id) => axios.post(`http://localhost:4000/admin/associate/routine/${id}`, routine, {
	data: routine
})
	.then(res => res.data)
	.catch(err => err);