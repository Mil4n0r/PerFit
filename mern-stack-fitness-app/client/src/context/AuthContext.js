import React, { createContext, useState, useEffect } from 'react';
import { checkLoggedIn } from '../api';

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
	const [loggedIn, setLoggedIn] = useState(undefined);

	const getLoggedIn = async () => {
		const loggedInRes = await checkLoggedIn();
		setLoggedIn(loggedInRes);
	}

	useEffect(() => {
		getLoggedIn();
	}, []);
	
	return (
		<AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;