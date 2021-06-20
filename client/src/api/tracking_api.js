import axios from 'axios';


export const createTracking = (tracking) => axios.post("http://localhost:4000/admin/create/tracking", tracking, {
	data: tracking
})
	.then(res => res.data)
	.catch(err => err);

export const getTrackings = () => axios.get("http://localhost:4000/admin/tracking/list")
	.then(res => res.data)
	.catch(err => err);

export const getTrackingsForUser = (id) => axios.get(`http://localhost:4000/admin/tracking/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getTracking = (id) => axios.get(`http://localhost:4000/admin/tracking/${id}`)
	.then(res => res.data)
	.catch(err => err);
	
export const updateTracking = (tracking,id) => axios.post(`http://localhost:4000/admin/tracking/${id}`, tracking, {
	data: tracking
})
	.catch(err => err);

export const deleteTracking = (id) => axios.delete(`http://localhost:4000/admin/tracking/${id}`)
	.catch(err => err);

export const associateTracking = (tracking,id) => axios.post(`http://localhost:4000/admin/associate/tracking/${id}`, tracking, {
	data: tracking
})
	.then(res => res.data)
	.catch(err => err);