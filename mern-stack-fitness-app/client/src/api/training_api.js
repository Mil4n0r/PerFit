import axios from 'axios';

export const addTraining = (training, id) => axios.post(`http://localhost:4000/admin/associate/routine/training/${id}`, training, { // id = id rutina
	data: training
})
	.then(res => res.data)

export const updateTraining = (id, trainingid, training) => axios.post(`http://localhost:4000/admin/training/${id}/${trainingid}`, training, {
	data: training
});

export const deleteTraining = (routineid, id) => axios.delete(`http://localhost:4000/admin/training/${routineid}/${id}`)// id = id entrenamiento

export const getTrainings = (id) => axios.get(`http://localhost:4000/admin/training/list/${id}`) // id = id rutina
	.then(res => res.data)

export const getTrainingsForDate = (id, date) => axios.get(`http://localhost:4000/admin/training/list/${id}/${date}`) // id = id rutina
	.then(res => res.data)

export const getTrainingsForMonth = (id, date) => axios.get(`http://localhost:4000/admin/training/list/month/${id}/${date}`) // id = id rutina
	.then(res => res.data)

export const getTraining = (id, trainingid) => axios.get(`http://localhost:4000/admin/training/${id}/${trainingid}`) // id = id rutina
	.then(res => res.data)

export const addWorkout = (id, trainingid, workout) => axios.post(`http://localhost:4000/admin/associate/training/workout/${id}/${trainingid}`, workout, { // id = id training
	data: workout
})
	.then(res => res.data)

export const getWorkout = (id, workoutid) => axios.get(`http://localhost:4000/admin/workout/${id}/${workoutid}`) // id = id rutina
	.then(res => res.data)

export const updateWorkout = (id, trainingid, workout) => axios.post(`http://localhost:4000/admin/workout/${id}/${trainingid}`, workout, {
	data: workout
});

export const deleteWorkout = (id, trainingid, workoutid) => axios.delete(`http://localhost:4000/admin/workout/${id}/${trainingid}/${workoutid}`);