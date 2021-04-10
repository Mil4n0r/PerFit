import axios from 'axios';

export const addMeasure = (measure, id) => axios.post(`http://localhost:4000/user/associate/tracking/measure/${id}`, measure, { // id = id tracking
	data: measure
})
	.then(res => res.data)

export const getMeasures = (id) => axios.get(`http://localhost:4000/user/measure/list/${id}`) // id = id seguimiento
	.then(res => res.data)

export const getMeasure = (id) => axios.get(`http://localhost:4000/user/measure/${id}`)
	.then(res => res.data);

export const updateMeasure = (measure,id) => axios.post(`http://localhost:4000/user/measure/${id}`, measure, {
	data: measure
});

export const deleteMeasure = (trackingid, id) => axios.delete(`http://localhost:4000/user/measure/${trackingid}/${id}`)
