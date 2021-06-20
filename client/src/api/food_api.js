import axios from 'axios';

export const createFood = (food) => axios.post("http://localhost:4000/user/create/food", food, {
	data: food
})
	.then(res => res.data)
	.catch(err => err);

export const getFoodsCreated = (creator) => axios.get(`http://localhost:4000/user/foods/created/${creator}`)
	.then(res => res.data)
	.catch(err => err);

export const getFoodsMatching = (search) => axios.get(`http://localhost:4000/user/food/list/${search}`)
	.then(res => res.data)
	.catch(err => err);

export const getFood = (id) => axios.get(`http://localhost:4000/user/food/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateFood = (food,id) => axios.post(`http://localhost:4000/user/food/${id}`, food, {
	data: food
})
	.catch(err => err);

export const deleteFood = (id) => axios.delete(`http://localhost:4000/user/food/${id}`)
	.catch(err => err);