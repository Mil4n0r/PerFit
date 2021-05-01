import axios from 'axios';

export const createSubscription = (subscription) => axios.post("http://localhost:4000/admin/create/subscription", subscription, {
	data: subscription
})
	.then(res => res.data);

export const getSubscriptions = () => axios.get("http://localhost:4000/subscription/list")
	.then(res => res.data)

export const getSubscription = (id) => axios.get(`http://localhost:4000/admin/subscription/${id}`)
	.then(res => res.data);

export const updateSubscription = (subscription,id) => axios.post(`http://localhost:4000/admin/subscription/${id}`, subscription, {
	data: subscription
});

export const deleteSubscription = (id) => axios.delete(`http://localhost:4000/admin/subscription/${id}`)