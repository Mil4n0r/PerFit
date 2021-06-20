import axios from 'axios';

export const createActivity = (activity) => axios.post("https://perfit-fitness.herokuapp.com/admin/create/activity", activity, {
	data: activity
})
	.then(res => res.data)
	.catch(err => err);

export const getActivities = () => axios.get("https://perfit-fitness.herokuapp.com/admin/activity/list")
	.then(res => res.data)
	.catch(err => err);

export const getActivity = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/activity/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateActivity = (activity,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/activity/${id}`, activity, {
	data: activity
})
	.catch(err => err);

export const deleteActivity = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/activity/${id}`)
	.catch(err => err);