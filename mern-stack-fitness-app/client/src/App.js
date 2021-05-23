import React from 'react';
import NavigationBar from './components/common/layout/NavigationBar';
import Router from './Router';
import Header from './components/common/layout/Header';
import { AuthContextProvider } from './context/AuthContext';
import { FormContextProvider } from './context/FormContext';

import theme from './style/theme';
import { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@material-ui/core';

// Estructura general de la aplicación
function App() {
	return (
		<AuthContextProvider>
			<FormContextProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Header />
					<NavigationBar />
					<Router />
				</ThemeProvider>
			</FormContextProvider>
    	</AuthContextProvider>
  );
}

export default App;