import React from 'react';
import NavBar from './components/layout/NavBar';
import Router from './Router';
import { AuthContextProvider } from './context/AuthContext';
import UserContext, { UserContextProvider } from './context/UserContext';
// Estructura general de la aplicación
function App() {
	return (
		<AuthContextProvider>
			<UserContextProvider>
				<NavBar />
				<Router />
			</UserContextProvider>
    	</AuthContextProvider>
  );
}

export default App;