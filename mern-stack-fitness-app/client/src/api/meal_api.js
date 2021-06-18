import axios from 'axios';

export const addMeal = (meal, id) => axios.post(`http://localhost:4000/admin/associate/diet/meal/${id}`, meal, { // id = id diet
	data: meal
})
	.then(res => res.data)
	.catch(err => err);

export const updateMeal = (id, mealid, meal) => axios.post(`http://localhost:4000/admin/meal/${id}/${mealid}`, meal, {
	data: meal
})
	.catch(err => err);

export const deleteMeal = (dietid, id) => axios.delete(`http://localhost:4000/admin/meal/${dietid}/${id}`)// id = id meal
	.catch(err => err);

export const getMeals = (id) => axios.get(`http://localhost:4000/admin/meal/list/${id}`) // id = id diet
	.then(res => res.data)
	.catch(err => err);

export const getMealsForDate = (id, date) => axios.get(`http://localhost:4000/admin/meal/list/${id}/${date}`) // id = id diet
	.then(res => res.data)
	.catch(err => err);

export const getMealsForMonth = (id, date) => axios.get(`http://localhost:4000/admin/meal/list/month/${id}/${date}`) // id = id diet
	.then(res => res.data)
	.catch(err => err);

export const getMeal = (id, mealid) => axios.get(`http://localhost:4000/admin/meal/${id}/${mealid}`) // id = id diet
	.then(res => res.data)
	.catch(err => err);

export const addRation = (id, mealid, ration) => axios.post(`http://localhost:4000/admin/associate/meal/ration/${id}/${mealid}`, ration, { // id = id meal
	data: ration
})
	.then(res => res.data)
	.catch(err => err);

export const getRation = (id, rationid) => axios.get(`http://localhost:4000/admin/ration/${id}/${rationid}`) // id = id diet
	.then(res => res.data)
	.catch(err => err);

export const updateRation = (id, rationid, ration) => axios.post(`http://localhost:4000/admin/ration/${id}/${rationid}`, ration, {
	data: ration
})
	.catch(err => err);

export const deleteRation = (id, mealid, rationid) => axios.delete(`http://localhost:4000/admin/ration/${id}/${mealid}/${rationid}`)
	.catch(err => err);