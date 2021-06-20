import axios from 'axios';

export const getRequestsForUser = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/request/list/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const sendFriendRequest = (id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/friend/request/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const acceptFriendRequest = (id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/accept/friend/request/${id}`)
	.catch(err => err);

export const rejectFriendRequest = (id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/reject/friend/request/${id}`)
	.catch(err => err);

export const sendTrainingRequest = (id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/train/request/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const acceptTrainingRequest = (id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/accept/train/request/${id}`)
	.catch(err => err);

export const rejectTrainingRequest = (id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/reject/train/request/${id}`)
	.catch(err => err);