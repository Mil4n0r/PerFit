import axios from 'axios';

export const createRoom = (room) => axios.post("http://localhost:4000/admin/create/room", room, {
	data: room
})
	.then(res => res.data);

export const getRooms = () => axios.get("http://localhost:4000/admin/room/list")
	.then(res => res.data)

export const getRoom = (id) => axios.get(`http://localhost:4000/admin/room/${id}`)
	.then(res => res.data);

export const updateRoom = (room,id) => axios.post(`http://localhost:4000/admin/room/${id}`, room, {
	data: room
});

export const deleteRoom = (id) => axios.delete(`http://localhost:4000/admin/room/${id}`)