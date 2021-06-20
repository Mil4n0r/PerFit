import axios from 'axios';

export const addTraining = (training, id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/associate/routine/training/${id}`, training, { // id = id rutina
	data: training
})
	.then(res => res.data)
	.catch(err => err);

export const updateTraining = (id, trainingid, training) => axios.post(`https://perfit-fitness.herokuapp.com/admin/training/${id}/${trainingid}`, training, {
	data: training
})
	.catch(err => err);

export const deleteTraining = (routineid, id) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/training/${routineid}/${id}`)// id = id entrenamiento
	.catch(err => err);

export const getTrainings = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/training/list/${id}`) // id = id rutina
	.then(res => res.data)
	.catch(err => err);

export const getTrainingsForDate = (id, date) => axios.get(`https://perfit-fitness.herokuapp.com/admin/training/list/${id}/${date}`) // id = id rutina
	.then(res => res.data)
	.catch(err => err);

export const getTrainingsForMonth = (id, date) => axios.get(`https://perfit-fitness.herokuapp.com/admin/training/list/month/${id}/${date}`) // id = id rutina
	.then(res => res.data)
	.catch(err => err);

export const getTraining = (id, trainingid) => axios.get(`https://perfit-fitness.herokuapp.com/admin/training/${id}/${trainingid}`) // id = id rutina
	.then(res => res.data)
	.catch(err => err);

export const addWorkout = (id, trainingid, workout) => axios.post(`https://perfit-fitness.herokuapp.com/admin/associate/training/workout/${id}/${trainingid}`, workout, { // id = id training
	data: workout
})
	.then(res => res.data)
	.catch(err => err);

export const getWorkout = (id, workoutid) => axios.get(`https://perfit-fitness.herokuapp.com/admin/workout/${id}/${workoutid}`) // id = id rutina
	.then(res => res.data)
	.catch(err => err);

export const updateWorkout = (id, trainingid, workout) => axios.post(`https://perfit-fitness.herokuapp.com/admin/workout/${id}/${trainingid}`, workout, {
	data: workout
})
	.catch(err => err);

export const deleteWorkout = (id, trainingid, workoutid) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/workout/${id}/${trainingid}/${workoutid}`)
	.catch(err => err);