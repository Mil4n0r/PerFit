import React from 'react';
import NavBar from './components/layout/NavBar';
import Router from './Router';
import { AuthContextProvider } from './context/AuthContext';
// Estructura general de la aplicación
function App() {
	return (
		<AuthContextProvider>
			<NavBar />
			<Router />
    	</AuthContextProvider>
  );
}

export default App;