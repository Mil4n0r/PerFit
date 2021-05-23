import styled from 'styled-components'
import {Tab, Tabs, AppBar, Button, TableHead, TableRow, TableCell, Container, Avatar, Typography, Grid, TextField, Select, InputLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {indigo, purple, green, red} from '@material-ui/core/colors'
import { ErrorMessage } from '@hookform/error-message';

const HeaderContainer = styled.div`
	background: ${props => props.theme.palette.primary.dark};
	display: flex;
	justify-content:center; // centers in the flex direction and the default flex-direction is row
	align-items:center; // centers perpendicular to the flex direction
	padding: 1em;
`;

const NavLink = styled(Link)`
	color: Red;
	text-decoration: none;
`

const NavBar = styled(AppBar)`
	&& { 
		width: 100%;
		padding: 0;
		margin: 0;
	}
`

const NavTab = styled(Tab)`
	&& { 
		text-decoration: none;
		color: white;
	}
	&:hover {
		color: ${props => props.theme.palette.secondary.main};
	}
`

const NavTabs = styled(Tabs)`
	&& {
		background: ${props => props.theme.palette.primary.dark};
		width: 100%;
	}
`

const LogOutButton = styled(Button)({
	
})

const CustomTableHead = styled(TableHead)`
	&& {
		background: ${props => props.theme.palette.primary.dark};
	}
`

const CustomTableRow = styled(TableRow)`
`

const BodyContainer = styled(Container)`
	&& {
		display: flex;
		padding: 1em;
		text-align: center;
		justify-content:center;
		align-items:center;
		flex-direction: column;
	}
`

const FormContainer = styled(Container)`
	&& {
		display: flex;
		padding: 1em;
		text-align: left;
		justify-content:center;
		align-items:center;
		flex-direction: column;
	}
`

const TableHeaderCell = styled(TableCell)`
	&& {
		color: white;
		font-weight: bold;
	}
`

const LoginButton = styled(Button)`
	&& {
		margin-top: ${props => props.theme.spacing(2)};
		margin-bottom: ${props => props.theme.spacing(2)};
	}
`

const LoginAvatar = styled(Avatar)`
	&& {
		background-color: ${props => props.theme.palette.secondary.main};
		margin: ${props => props.theme.spacing(2)};
	}
`

const RegisterAvatar = styled(Avatar)`
	&& {
		background-color: ${props => props.theme.palette.primary.main};
		margin: ${props => props.theme.spacing(2)};
	}
`

const FullWidthForm = styled.form`
	width: 100%;
	color: ${red[500]}; // Color de los errores
`

const CustomTypography = styled(Typography)`
	&.MuiTypography-h5 {
		font-weight: bold;
	}
`

const ButtonsContainer = styled(Container)`
	&& {
		margin: ${props => props.theme.spacing(2)} 0 0 0;
		padding: 0
	}
`

const TextFieldWithMargin = styled(TextField)`
	&& {
		margin: ${props => props.theme.spacing(2)} 0 ${props => props.theme.spacing(1)} 0;
	}
`

const SelectWithMargin = styled(Select)`
	&& {
		margin: 0 0 ${props => props.theme.spacing(1)} 0;
	}
`

const InputLabelWithMargin = styled(InputLabel)`
	&& {
		margin: ${props => props.theme.spacing(2)} 0 0 0;
	}
`

export {HeaderContainer, NavTab, NavLink, NavTabs, NavBar, LogOutButton, CustomTableHead, CustomTableRow, BodyContainer, FormContainer, TableHeaderCell, LoginButton, LoginAvatar, RegisterAvatar, FullWidthForm, CustomTypography, ButtonsContainer, TextFieldWithMargin, SelectWithMargin, InputLabelWithMargin}