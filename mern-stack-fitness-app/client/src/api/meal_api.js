import axios from 'axios';

export const addMeal = (meal, id) => axios.post(`http://localhost:4000/admin/associate/diet/meal/${id}`, meal, { // id = id diet
	data: meal
})
	.then(res => res.data)

export const updateMeal = (meal,id) => axios.post(`http://localhost:4000/admin/meal/${id}`, meal, {
	data: meal
});

export const deleteMeal = (dietid, id) => axios.delete(`http://localhost:4000/admin/meal/${dietid}/${id}`)// id = id entrenamiento

export const getMeals = (id) => axios.get(`http://localhost:4000/admin/meal/list/${id}`) // id = id diet
	.then(res => res.data)

export const getMeal = (id) => axios.get(`http://localhost:4000/admin/meal/${id}`) // id = id meal
	.then(res => res.data)

export const addRation = (ration, id) => axios.post(`http://localhost:4000/admin/associate/meal/ration/${id}`, ration, { // id = id meal
	data: ration
})
	.then(res => res.data)

export const getRations = (id) => axios.get(`http://localhost:4000/admin/ration/list/${id}`) // id = id meal
	.then(res => res.data)

export const getRation = (id) => axios.get(`http://localhost:4000/admin/ration/${id}`) // id = id ration
	.then(res => res.data)

export const updateRation = (ration,id) => axios.post(`http://localhost:4000/admin/ration/${id}`, ration, {
	data: ration
});

export const deleteRation = (mealid, id) => axios.delete(`http://localhost:4000/admin/ration/${mealid}/${id}`);