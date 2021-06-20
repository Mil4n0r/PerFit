import axios from 'axios';

export const createExercise = (exercise) => axios.post("http://localhost:4000/user/create/exercise", exercise, {
	data: exercise
})
	.then(res => res.data)
	.catch(err => err);

export const getExercisesCreated = (creator) => axios.get(`http://localhost:4000/user/exercises/created/${creator}`)
	.then(res => res.data)
	.catch(err => err);

export const getExercisesMatching = (search) => axios.get(`http://localhost:4000/user/exercise/list/${search}`)
	.then(res => res.data)
	.catch(err => err);

export const getExercise = (id) => axios.get(`http://localhost:4000/user/exercise/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateExercise = (exercise,id) => axios.post(`http://localhost:4000/user/exercise/${id}`, exercise, {
	data: exercise
})
	.catch(err => err);

export const deleteExercise = (id) => axios.delete(`http://localhost:4000/user/exercise/${id}`)
	.catch(err => err);