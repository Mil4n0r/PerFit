import axios from 'axios';

export const createFood = (food) => axios.post("https://perfit-fitness.herokuapp.com/user/create/food", food, {
	data: food
})
	.then(res => res.data)
	.catch(err => err);

export const getFoodsCreated = (creator) => axios.get(`https://perfit-fitness.herokuapp.com/user/foods/created/${creator}`)
	.then(res => res.data)
	.catch(err => err);

export const getFoodsMatching = (search) => axios.get(`https://perfit-fitness.herokuapp.com/user/food/list/${search}`)
	.then(res => res.data)
	.catch(err => err);

export const getFood = (id) => axios.get(`https://perfit-fitness.herokuapp.com/user/food/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateFood = (food,id) => axios.post(`https://perfit-fitness.herokuapp.com/user/food/${id}`, food, {
	data: food
})
	.catch(err => err);

export const deleteFood = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/user/food/${id}`)
	.catch(err => err);