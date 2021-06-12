import axios from 'axios';

export const getDietsForUser = (id) => axios.get(`http://localhost:4000/admin/diet/list/${id}`)
	.then(res => res.data)

export const getDiet = (id) => axios.get(`http://localhost:4000/admin/diet/${id}`)
	.then(res => res.data);
	
export const updateDiet = (diet,id) => axios.post(`http://localhost:4000/admin/diet/${id}`, diet, {
	data: diet
});

export const deleteDiet = (id) => axios.delete(`http://localhost:4000/admin/diet/${id}`);

export const associateDiet = (diet,id) => axios.post(`http://localhost:4000/admin/associate/diet/${id}`, diet, {
	data: diet
})
	.then(res => res.data);