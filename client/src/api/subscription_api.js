import axios from 'axios';

export const createSubscription = (subscription) => axios.post("https://perfit-fitness.herokuapp.com/admin/create/subscription", subscription, {
	data: subscription
})
	.then(res => res.data)
	.catch(err => err);

export const getSubscriptions = () => axios.get("https://perfit-fitness.herokuapp.com/admin/subscription/list")
	.then(res => res.data)
	.catch(err => err);

export const getSubscriptionsGuest = () => axios.get("https://perfit-fitness.herokuapp.com/subscription/list")
	.then(res => res.data)
	.catch(err => err);

export const getSubscription = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/subscription/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getSubscriptionName = (id) => axios.get(`https://perfit-fitness.herokuapp.com/subscription/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateSubscription = (subscription,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/subscription/${id}`, subscription, {
	data: subscription
})
	.catch(err => err);

export const deleteSubscription = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/subscription/${id}`)
	.catch(err => err);

export const contractSubscription = (id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/contract/subscription/${id}`)
	.catch(err => err);