import axios from 'axios';

export const addTraining = (training, id) => axios.post(`http://localhost:4000/admin/associate/routine/training/${id}`, training, { // id = id rutina
	data: training
})

export const updateTraining = (training,id) => axios.post(`http://localhost:4000/admin/routine/${id}`, training, {
	data: training
});

export const deleteTraining = (routineid, id) => axios.delete(`http://localhost:4000/admin/training/${routineid}/${id}`)// id = id entrenamiento

export const getTrainings = (id) => axios.get(`http://localhost:4000/admin/training/list/${id}`) // id = id rutina
	.then(res => res.data)

export const getTraining = (id) => axios.get(`http://localhost:4000/admin/training/${id}`) // id = id training
	.then(res => res.data)