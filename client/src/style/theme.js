import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
	spacing: factor => `${0.5 * factor}rem`,
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#fff',
		}
	},
	typography: {
		body1: {
			'@media (max-width:600px)': {
				fontSize: '0.75rem',
			},
		},
		body2: {
			'@media (max-width:600px)': {
				fontSize: '0.75rem',
			},
		},
		subtitle1: {
			'@media (max-width:600px)': {
				fontSize: '0.75rem',
			},
		},
		subtitle2: {
			'@media (max-width:600px)': {
				fontSize: '0.75rem',
			},
		},
		caption: {
			'@media (max-width:600px)': {
				fontSize: '0.75rem',
			},
		},
	}
});

theme = responsiveFontSizes(theme);

export default theme