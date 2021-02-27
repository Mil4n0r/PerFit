import axios from 'axios';

export const checkLoggedIn = () => axios.get("http://localhost:4000/admin/checkloggedin")
	.then(res => res.data)

export const checkCurrentUser = () => axios.get("http://localhost:4000/admin/checkcurrentuser")
	.then(res => res.data)