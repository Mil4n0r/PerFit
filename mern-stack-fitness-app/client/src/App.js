import React from 'react';
import NavigationBar from './components/common/layout/NavigationBar';
import Router from './Router';
import { AuthContextProvider } from './context/AuthContext';
import { FormContextProvider } from './context/FormContext';

import theme from './style/theme';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { es } from 'date-fns/locale'
import DateFnsUtils from '@date-io/date-fns';

// Estructura general de la aplicación
function App() {
	return (
		<AuthContextProvider>
			<FormContextProvider>
				<MuiThemeProvider theme={theme}>
					<ThemeProvider theme={theme}>
						<MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
							<CssBaseline />
							<NavigationBar />
							<Router />
						</MuiPickersUtilsProvider>
					</ThemeProvider>
				</MuiThemeProvider>
			</FormContextProvider>
    	</AuthContextProvider>
  );
}

export default App;