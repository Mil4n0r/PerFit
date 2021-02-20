import React from 'react';
import NavBar from './components/layout/NavBar';
import Router from './Router';
import { AuthContextProvider } from './context/AuthContext';
import { FormContextProvider } from './context/FormContext';
// Estructura general de la aplicación
function App() {
	return (
		<AuthContextProvider>
			<FormContextProvider>
				<NavBar />
				<Router />
			</FormContextProvider>
    	</AuthContextProvider>
  );
}

export default App;