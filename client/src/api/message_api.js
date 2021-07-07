import axios from 'axios';

export const getMessagesSentByUser = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/message/list/sent/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getMessagesReceivedByUser = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/message/list/received/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const getMessage = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/message/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const sendMessage = (message, id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/message/send/${id}`, message, {
	data: message
})
	.then(res => res.data)
	.catch(err => err);

export const deleteMessage = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/message/${id}`)
	.catch(err => err);