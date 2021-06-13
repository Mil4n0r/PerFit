import axios from 'axios';

export const createFood = (food) => axios.post("http://localhost:4000/user/create/food", food, {
	data: food
})
	.then(res => res.data);

export const getFoodsCreated = (creator) => axios.get(`http://localhost:4000/user/foods/created/${creator}`)
	.then(res => res.data)

export const getFoodsMatching = (search) => axios.get(`http://localhost:4000/user/food/list/${search}`)
	.then(res => res.data)

export const getFood = (id) => axios.get(`http://localhost:4000/user/food/${id}`)
	.then(res => res.data);

export const updateFood = (food,id) => axios.post(`http://localhost:4000/user/food/${id}`, food, {
	data: food
});

export const deleteFood = (id) => axios.delete(`http://localhost:4000/user/food/${id}`);