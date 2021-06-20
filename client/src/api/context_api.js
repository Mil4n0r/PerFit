import axios from 'axios';

export const checkLoggedIn = () => axios.get("https://perfit-fitness.herokuapp.com/user/checkloggedin")
	.then(res => res.data)