import axios from 'axios';

export const createExercise = (exercise) => axios.post("https://perfit-fitness.herokuapp.com/user/create/exercise", exercise, {
	data: exercise
})
	.then(res => res.data)
	.catch(err => err);

export const getExercisesCreated = (creator) => axios.get(`https://perfit-fitness.herokuapp.com/user/exercises/created/${creator}`)
	.then(res => res.data)
	.catch(err => err);

export const getExercisesMatching = (search) => axios.get(`https://perfit-fitness.herokuapp.com/user/exercise/list/${search}`)
	.then(res => res.data)
	.catch(err => err);

export const getExercise = (id) => axios.get(`https://perfit-fitness.herokuapp.com/user/exercise/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateExercise = (exercise,id) => axios.post(`https://perfit-fitness.herokuapp.com/user/exercise/${id}`, exercise, {
	data: exercise
})
	.catch(err => err);

export const deleteExercise = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/user/exercise/${id}`)
	.catch(err => err);