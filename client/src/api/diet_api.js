import axios from 'axios';

export const getDietsForUser = (id) => axios.get(`http://localhost:4000/admin/diet/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getDiet = (id) => axios.get(`http://localhost:4000/admin/diet/${id}`)
	.then(res => res.data)
	.catch(err => err);
	
export const updateDiet = (diet,id) => axios.post(`http://localhost:4000/admin/diet/${id}`, diet, {
	data: diet
})
	.catch(err => err);

export const deleteDiet = (id) => axios.delete(`http://localhost:4000/admin/diet/${id}`)
	.catch(err => err);

export const associateDiet = (diet,id) => axios.post(`http://localhost:4000/admin/associate/diet/${id}`, diet, {
	data: diet
})
	.then(res => res.data)
	.catch(err => err);