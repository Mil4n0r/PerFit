import axios from 'axios';

export const createRoom = (room) => axios.post("https://perfit-fitness.herokuapp.com/admin/create/room", room, {
	data: room
})
	.then(res => res.data)
	.catch(err => err);

export const getRooms = () => axios.get("https://perfit-fitness.herokuapp.com/admin/room/list")
	.then(res => res.data)
	.catch(err => err);

export const getRoom = (id) => axios.get(`https://perfit-fitness.herokuapp.com/admin/room/${id}`)
	.then(res => res.data)
	.catch(err => err);

export const updateRoom = (room,id) => axios.post(`https://perfit-fitness.herokuapp.com/admin/room/${id}`, room, {
	data: room
})
	.catch(err => err);

export const deleteRoom = (id) => axios.delete(`https://perfit-fitness.herokuapp.com/admin/room/${id}`)
	.catch(err => err);