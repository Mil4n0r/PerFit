import axios from 'axios';

export const addTraining = (training, id) => axios.post(`http://localhost:4000/admin/associate/routine/training/${id}`, training, { // id = id rutina
	data: training
})
	.then(res => res.data)

export const updateTraining = (training,id) => axios.post(`http://localhost:4000/admin/training/${id}`, training, {
	data: training
});

export const deleteTraining = (routineid, id) => axios.delete(`http://localhost:4000/admin/training/${routineid}/${id}`)// id = id entrenamiento

export const getTrainings = (id) => axios.get(`http://localhost:4000/admin/training/list/${id}`) // id = id rutina
	.then(res => res.data)

export const getTraining = (id) => axios.get(`http://localhost:4000/admin/training/${id}`) // id = id training
	.then(res => res.data)

export const addWorkout = (workout, id) => axios.post(`http://localhost:4000/admin/associate/training/workout/${id}`, workout, { // id = id training
	data: workout
})
	.then(res => res.data)

export const getWorkouts = (id) => axios.get(`http://localhost:4000/admin/workout/list/${id}`) // id = id training
	.then(res => res.data)

export const getWorkout = (id) => axios.get(`http://localhost:4000/admin/workout/${id}`) // id = id workout
	.then(res => res.data)

export const updateWorkout = (workout,id) => axios.post(`http://localhost:4000/admin/workout/${id}`, workout, {
	data: workout
});

export const deleteWorkout = (trainingid, id) => axios.delete(`http://localhost:4000/admin/workout/${trainingid}/${id}`);