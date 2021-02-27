import axios from 'axios';

export const createExercise = (exercise) => axios.post("http://localhost:4000/admin/create/exercise", exercise, {
	data: exercise
})
	.then(res => console.log(res.data));

export const getExercises = () => axios.get("http://localhost:4000/admin/exercise/list")
	.then(res => res.data)

export const getExercise = (id) => axios.get(`http://localhost:4000/admin/exercise/${id}`)
	.then(res => res.data);

export const updateExercise = (exercise,id) => axios.post(`http://localhost:4000/admin/exercise/${id}`, exercise, {
	data: exercise
});

export const deleteExercise = (id) => axios.delete(`http://localhost:4000/admin/exercise/${id}`)