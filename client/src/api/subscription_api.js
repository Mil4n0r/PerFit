import axios from 'axios';

export const createSubscription = (subscription) => axios.post("http://localhost:4000/admin/create/subscription", subscription, {
	data: subscription
})
	.then(res => res.data)
	.catch(err => err);

export const getSubscriptions = () => axios.get("http://localhost:4000/admin/subscription/list")
	.then(res => res.data)
	.catch(err => err);

export const getSubscriptionsGuest = () => axios.get("http://localhost:4000/subscription/list")
	.then(res => res.data)
	.catch(err => err);

export const getSubscription = (id) => axios.get(`http://localhost:4000/admin/subscription/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getSubscriptionName = (id) => axios.get(`http://localhost:4000/subscription/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateSubscription = (subscription,id) => axios.post(`http://localhost:4000/admin/subscription/${id}`, subscription, {
	data: subscription
})
	.catch(err => err);

export const deleteSubscription = (id) => axios.delete(`http://localhost:4000/admin/subscription/${id}`)
	.catch(err => err);

export const contractSubscription = (id) => axios.post(`http://localhost:4000/admin/contract/subscription/${id}`)
	.catch(err => err);