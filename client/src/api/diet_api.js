import axios from 'axios';

export const getDietsForUser = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/diet/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getDiet = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/diet/${id}`)
	.then(res => res.data)
	.catch(err => err);
	
export const updateDiet = (diet,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/diet/${id}`, diet, {
	data: diet
})
	.catch(err => err);

export const deleteDiet = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/diet/${id}`)
	.catch(err => err);

export const associateDiet = (diet,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/associate/diet/${id}`, diet, {
	data: diet
})
	.then(res => res.data)
	.catch(err => err);