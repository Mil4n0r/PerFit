import axios from 'axios';

export const getRoutines = () => axios.get("https://perfit-fitness.herokuapp.com/admin/routine/list")
	.then(res => res.data)
	.catch(err => err);

export const getRoutinesForUser = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/routine/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getRoutine = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/routine/${id}`)
	.then(res => res.data)
	.catch(err => err);
	
export const updateRoutine = (routine,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/routine/${id}`, routine, {
	data: routine
})
	.catch(err => err);

export const deleteRoutine = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/routine/${id}`)
	.catch(err => err);

export const associateRoutine = (routine,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/associate/routine/${id}`, routine, {
	data: routine
})
	.then(res => res.data)
	.catch(err => err);