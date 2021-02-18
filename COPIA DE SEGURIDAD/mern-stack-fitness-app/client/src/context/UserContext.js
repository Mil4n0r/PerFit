import React, { createContext, useState, useEffect } from 'react';
import { checkCurrentUser } from '../api';
/*
const UserContext = createContext();

export const UserContextProvider = (props) => {
	const [user, setUser] = useState(undefined);

	const getCurrentUser = async () => {
		const currentUser = await checkCurrentUser();
		setUser(currentUser);
	}

	useEffect(() => {
		getCurrentUser();
	}, []);
	
	return (
		<UserContext.Provider value={{ user, getCurrentUser }}>
			{props.children}
		</UserContext.Provider>
	);
}

export default UserContext;
*/