import styled from 'styled-components'
import {Tab, Tabs, AppBar, Button, TableHead, TableRow, TableCell, TableContainer, Container, Avatar, Typography, Grid, TextField, Select, InputLabel, Modal, Paper, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {indigo, purple, green, red} from '@material-ui/core/colors'
import { ErrorMessage } from '@hookform/error-message';

const HeaderContainer = styled.div`
	background: ${props => props.theme.palette.primary.dark};
	display: flex;
	justify-content:center; // centers in the flex direction and the default flex-direction is row
	align-items:center; // centers perpendicular to the flex direction
	padding: ${props => props.theme.spacing(2)};
`;

const NavLink = styled(Link)`
	color: ${props => props.theme.palette.secondary.main};
	text-decoration: none;
`

const NavProgress = styled(CircularProgress)`
	&& {
		padding: ${props => props.theme.spacing(1)};
		width: 50px;
		height: 50px;
	}
`

const NavBar = styled(AppBar)`
	&& { 
		width: 100%;
		padding: 0;
		margin: 0;
		background: ${props => props.theme.palette.primary.dark};
		align-items: center;
		justify-content: center;
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
		width: 100%;
	}
	a {
		padding: ${props => props.theme.spacing(1.5)}
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
		padding: ${props => props.theme.spacing(2)};
		text-align: center;
		justify-content:center;
		align-items:center;
		flex-direction: column;
	}
`

const FormContainer = styled(Container)`
	&& {
		display: flex;
		padding: ${props => props.theme.spacing(2)};
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

const ButtonAvatar = styled(Avatar)`
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

const VerticalGrid = styled(Grid)`
	&& {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: ${props => props.theme.spacing(2)}
	}
`

const InputLabelWithoutMargin = styled(InputLabel)`
	&& {
		margin: 0;
	}
`

const HorizontalGrid = styled(Grid)`
	&& {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		${props => props.theme.spacing(2)}
	}
`

const PrimaryLink = styled(Link)`
	&& {
		color: ${props => props.theme.palette.primary.main};
		text-decoration: none;
	}
`

const TableContainerWithMargin = styled(TableContainer)`
	&& {
		margin: ${props => props.theme.spacing(2)}
	}
`

const CenterPaper = styled(Paper)`
	&& {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
`

export {HeaderContainer, NavTab, NavProgress, NavLink, NavTabs, NavBar, LogOutButton, CustomTableHead, CustomTableRow, BodyContainer, FormContainer, TableHeaderCell, LoginButton, LoginAvatar, RegisterAvatar, ButtonAvatar, FullWidthForm, CustomTypography, ButtonsContainer, TextFieldWithMargin, SelectWithMargin, InputLabelWithMargin, InputLabelWithoutMargin, VerticalGrid, HorizontalGrid, PrimaryLink, TableContainerWithMargin, CenterPaper}