import axios from 'axios';


export const createTracking = (tracking) => axios.post("https://perfit-fitness.herokuapp.com/admin/create/tracking", tracking, {
	data: tracking
})
	.then(res => res.data)
	.catch(err => err);

export const getTrackings = () => axios.get("https://perfit-fitness.herokuapp.com/admin/tracking/list")
	.then(res => res.data)
	.catch(err => err);

export const getTrackingsForUser = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/tracking/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getTracking = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/tracking/${id}`)
	.then(res => res.data)
	.catch(err => err);
	
export const updateTracking = (tracking,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/tracking/${id}`, tracking, {
	data: tracking
})
	.catch(err => err);

export const deleteTracking = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/tracking/${id}`)
	.catch(err => err);

export const associateTracking = (tracking,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/associate/tracking/${id}`, tracking, {
	data: tracking
})
	.then(res => res.data)
	.catch(err => err);