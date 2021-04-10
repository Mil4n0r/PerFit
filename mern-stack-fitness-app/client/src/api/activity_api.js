import axios from 'axios';

export const createActivity = (activity) => axios.post("http://localhost:4000/admin/create/activity", activity, {
	data: activity
})
	.then(res => res.data);

export const getActivities = () => axios.get("http://localhost:4000/admin/activity/list")
	.then(res => res.data)

export const getActivity = (id) => axios.get(`http://localhost:4000/admin/activity/${id}`)
	.then(res => res.data);

export const updateActivity = (activity,id) => axios.post(`http://localhost:4000/admin/activity/${id}`, activity, {
	data: activity
});

export const deleteActivity = (id) => axios.delete(`http://localhost:4000/admin/activity/${id}`)