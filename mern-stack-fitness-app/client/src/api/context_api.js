import axios from 'axios';

export const checkLoggedIn = () => axios.get("http://localhost:4000/user/checkloggedin")
	.then(res => res.data)