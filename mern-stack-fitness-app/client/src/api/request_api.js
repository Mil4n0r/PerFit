import axios from 'axios';

export const getRequestsForUser = (id) => axios.get(`http://localhost:4000/admin/request/list/${id}`)
	.then(res => res.data);

export const sendFriendRequest = (id) => axios.post(`http://localhost:4000/admin/friend/request/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const acceptFriendRequest = (id) => axios.post(`http://localhost:4000/admin/accept/friend/request/${id}`);

export const rejectFriendRequest = (id) => axios.post(`http://localhost:4000/admin/reject/friend/request/${id}`);

export const sendTrainingRequest = (id) => axios.post(`http://localhost:4000/admin/train/request/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const acceptTrainingRequest = (id) => axios.post(`http://localhost:4000/admin/accept/train/request/${id}`);

export const rejectTrainingRequest = (id) => axios.post(`http://localhost:4000/admin/reject/train/request/${id}`);