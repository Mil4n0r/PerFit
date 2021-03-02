import axios from 'axios';

export const createRoutine = (routine) => axios.post("http://localhost:4000/admin/create/routine", routine, {
	data: routine
})
	.then(res => console.log(res.data));

export const getRoutines = () => axios.get("http://localhost:4000/admin/routine/list")
	.then(res => res.data)

export const getRoutinesForUser = (id) => axios.get(`http://localhost:4000/admin/routine/list/${id}`)
	.then(res => res.data)

export const getRoutine = (id) => axios.get(`http://localhost:4000/admin/routine/${id}`)
	.then(res => res.data);
	
export const updateRoutine = (routine,id) => axios.post(`http://localhost:4000/admin/routine/${id}`, routine, {
	data: routine
});

export const deleteRoutine = (id) => axios.delete(`http://localhost:4000/admin/routine/${id}`)

export const associateRoutine = (routine,id) => axios.post(`http://localhost:4000/admin/associate/routine/${id}`, routine, {
	data: routine
})
	.then(res => res.data);

export const addTraining = (training, id) => axios.post(`http://localhost:4000/admin/associate/routine/training/${id}`, training, { // id = id rutina
	data: training
})

export const deleteTraining = (routineid, id) => axios.delete(`http://localhost:4000/admin/training/${routineid}/${id}`)// id = id entrenamiento

export const getTrainings = (id) => axios.get(`http://localhost:4000/admin/training/list/${id}`) // id = id rutina
	.then(res => res.data)