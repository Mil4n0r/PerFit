import axios from 'axios';

export const addMeasure = (measure, id) => axios.post(`https://perfit-fitness.herokuapp.com/user/associate/tracking/measure/${id}`, measure, { // id = id tracking
	data: measure
})
	.then(res => res.data)
	.catch(err => err);

export const getMeasures = (id) => axios.get(`https://perfit-fitness.herokuapp.com/user/measure/list/${id}`) // id = id seguimiento
	.then(res => res.data)
	.catch(err => err);

export const getMeasure = (id) => axios.get(`https://perfit-fitness.herokuapp.com/user/measure/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateMeasure = (measure,id) => axios.post(`https://perfit-fitness.herokuapp.com/user/measure/${id}`, measure, {
	data: measure
})
	.catch(err => err);

export const deleteMeasure = (trackingid, id) => axios.delete(`https://perfit-fitness.herokuapp.com/user/measure/${trackingid}/${id}`)
	.catch(err => err);